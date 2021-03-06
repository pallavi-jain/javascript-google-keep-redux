import $ from "jquery";
import 'jquery-ui';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';
import * as todoListModalService from '../service/toDoListModalService';
import * as getCardsService from '../service/getCards';
import {store} from '../index';
import * as masterRenderer from '../view/masterRender';

let editModeId = '',
 editMode = false,
 timeStampObj = {},
 deleteIndex = '';


export function onAddBtnClick() {
    const itemIndex = $("ul#taskList-ul").children().length + 1,
     taskItem = $('#addItem').val().
trim();

    if (taskItem) {
        let task_li_str = '';

        if (!editMode) {
            task_li_str = masterRenderer.todo(itemIndex, taskItem);
        } else {
            const id_suffix = `${editModeId}_${itemIndex}`;

            task_li_str = masterRenderer.todoEdit(id_suffix, taskItem);
        }
        $('ul#taskList-ul').append(task_li_str);
        $('#addListCardModal').modal('handleUpdate');
        $('#addItem').val('');
    }
}
$('#addNewItem').click(onAddBtnClick);

export function onSaveNewCardBtnClick() {
    const cardInfo = {};

    cardInfo.date = Date.now();
    cardInfo.name = $('#todoListTitle').val().
trim();
    cardInfo.data = [];
    const cardWrap = {};
    let liId = '',
    splitStr = '', 
    substr = '', 
    taskId = '', 
    taskObj = {};

    if (!editMode) {
        $("ul#taskList-ul li").each(function () {
            taskObj = {};
            taskObj.checked = false;
            liId = $(this).attr('id');
            splitStr = liId.split('_');
            splitStr.shift();
            substr = splitStr.join('_');
            taskId = `task_${substr}`;
            taskObj.taskName = String($(`#${taskId} span`).text()).trim();
            taskObj.date = Date.now();
            cardInfo.data.push(taskObj);
            cardInfo.order = getCardsService.totalCards + 1;
        });
    } else {
        $("ul#taskList-ul li").each(function () {
            taskObj = {};
            liId = $(this).attr('id');
            splitStr = liId.split('_');
            splitStr.shift();
            const id_substr = splitStr.join('_'),
             checkId = `check_${id_substr}`,
             inputId = `input_${id_substr}`;

            taskObj.checked = $(`#${checkId}`).is(":checked");
            taskObj.date = timeStampObj[checkId] ? timeStampObj[checkId] : Number($(this).attr('data-createDate'));
            if (!taskObj.date) {
                taskObj.date = Date.now();
            }
            taskObj.taskName = String($(`#${inputId}`).val()).trim();
            cardInfo.data.push(taskObj);
            cardInfo.edited = true;
            cardWrap.id = Number(splitStr[0]);
        });
    }
    
    cardWrap.card = cardInfo;
    const state = store.getState();

    $('#cardList').empty();
    
    if (!editMode) {
        const cardId = state.cards.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;

        cardWrap.id = cardId;
        store.dispatch({"type": 'ADD_CARD',
"card": cardWrap});   
    } else {
        store.dispatch({"type": 'EDIT_CARD',
"card": cardWrap});
    }
    getCardsService.cardListData[cardWrap.id] = cardWrap;
    todoListModalService.addCardData(cardInfo, onDataSave, editModeId);
}

export function openEditModal(index) {
    editMode = true;
    editModeId = index;
    const cardInfo = getCardsService.cardListData[index];

    $('#todoListTitle').val(cardInfo.card.name);
    $("ul#taskList-ul").empty();

    for (let i = 0; i < cardInfo.card.data.length; i++) {
        const element = cardInfo.card.data[i],
         id_suffix = `${index}_${i}`,
         isChecked = element.checked ? 'checked' : '';
         const dateAttr = element.date ? element.date : cardInfo.date;

         const task_li_str = masterRenderer.todoEdit(id_suffix, element.taskName, isChecked, dateAttr);

        $('ul#taskList-ul').append(task_li_str);
    }
    $('#addListCardModal').modal('handleUpdate');
    $('#addListCardModal').modal('show');
}

export function openConfirmation(index) {
    deleteIndex = index;
    $("#deleteConfirmationModal").modal('show');
}

const onDataDelete = () => $('#deleteConfirmationModal').modal('hide'),

 onDataSave = () => $('#addListCardModal').modal('hide');

$(document).on('shown.bs.modal', '#addListCardModal', () => $('#todoListTitle').trigger('focus'));
$(document).on('hidden.bs.modal', '#addListCardModal', () => {
    editMode = false;
    editModeId = undefined;
    deleteIndex = undefined;
    timeStampObj = {};
    $('#taskList-ul').empty();
    $('#todoListTitle').val('');
    $('#addItem').val('');
});

$(document).on('click', '#saveCardBtn', onSaveNewCardBtnClick );

$(document).on("click", ".deleteItem", function (e) {
    const deleteItemId = $(e.currentTarget).attr('id'),
     splitStr = deleteItemId.split('_');

    splitStr.shift();
    const substr = splitStr.join('_'),
     liId = `li_${substr}`;

    $(`#${liId}`).remove();
});

$(document).on("change", ".checkboxPopup", function (e) {
    timeStampObj[$(e.currentTarget).attr('id')] = Date.now();
});

$(document).on("keypress", "#addItem", function (e) {
    if (e.keyCode === 13) {
        onAddBtnClick();
    }
});

$(document).on('click', '#deleteConfirmbtn', onDeleteClick);

export function onDeleteClick() {
    $('#cardList').empty();
    store.dispatch({"type": 'DELETE_CARD',
"id": Number(deleteIndex)});
    todoListModalService.deleteCardData(onDataDelete, deleteIndex);
}