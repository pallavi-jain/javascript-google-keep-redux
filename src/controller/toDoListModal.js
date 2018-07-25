var $ = require('jquery');
require('jquery-ui');
import * as todoListModalService from '../service/toDoListModalService';
import * as getCardsService from '../service/getCards';
import {store} from '../index';
import * as masterRenderer from '../view/masterRender';

let editModeId;
let editMode = false;
let timeStampObj = {};
var deleteIndex;
$('#addNewItem').click(onAddBtnClick);
export function onAddBtnClick() {
    let itemIndex = $("ul#taskList-ul").children().length + 1;
    let taskItem = $('#addItem').val().trim();
    if (taskItem) {
        let task_li_str;
        if (!editMode) {
            task_li_str = masterRenderer.todo(itemIndex, taskItem);
        } else {
            const id_suffix = editModeId + '_' + itemIndex;
            let taskItem = $('#addItem').val().trim();
            task_li_str = masterRenderer.todoEdit(id_suffix, taskItem);
        }
        $('ul#taskList-ul').append(task_li_str);
        $('#addListCardModal').modal('handleUpdate');
        $('#addItem').val('');
    }
}

export function onSaveNewCardBtnClick() {
    let cardInfo = {};
    cardInfo.date = Date.now();
    cardInfo.name = $('#todoListTitle').val().trim();
    cardInfo.data = [];
    let cardWrap = {}; 
    let taskObj, liId, splitStr, substr, taskId
    if (!editMode) {
        $("ul#taskList-ul li").each(function (index) {
            taskObj = {};
            taskObj.checked = false;
            liId = $(this).attr('id');
            splitStr = liId.split('_');
            splitStr.shift();
            substr = splitStr.join('_');
            taskId = 'task_' + substr;
            taskObj.taskName = String($('#' + taskId + ' span').text()).trim();
            taskObj.date = Date.now();
            cardInfo.data.push(taskObj);
            cardInfo.order = getCardsService.totalCards + 1;
        });
    } else {
        $("ul#taskList-ul li").each(function (index) {
            taskObj = {};
            liId = $(this).attr('id');
            splitStr = liId.split('_');
            splitStr.shift();
            let id_substr = splitStr.join('_');
            const checkId = 'check_' + id_substr;
            const inputId = 'input_' + id_substr;
            taskObj.checked = $('#' + checkId).is(":checked");
            taskObj.date = timeStampObj[checkId] ? timeStampObj[checkId] : Number($(this).attr('data-createDate'));
            taskObj.taskName = String($('#' + inputId).val()).trim();
            cardInfo.data.push(taskObj);
            cardInfo.edited = true;
            cardWrap.id = Number(splitStr[0]);
        });
    }
    
    cardWrap.card = cardInfo;
    let state = store.getState();
    $('#cardList').empty();
    
    if(!editMode){
        let cardId = state.cards.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
        cardWrap.id = cardId;
        store.dispatch({type: 'ADD_CARD', card:cardWrap});   
    }else{
        store.dispatch({type: 'EDIT_CARD', card:cardWrap});
    }
    getCardsService.cardListData[cardWrap.id] = cardWrap;
    todoListModalService.addCardData(cardInfo, onDataSave, editModeId);
}

export function openEditModal(index) {
    editMode = true;
    editModeId = index;
    let cardInfo = getCardsService.cardListData[index];
    $('#todoListTitle').val(cardInfo.card.name);
    $("ul#taskList-ul").empty();

    for (let i = 0; i < cardInfo.card.data.length; i++) {
        const element = cardInfo.card.data[i];
        const id_suffix = index + '_' + i;
        let isChecked = element.checked ? 'checked' : '';
        let task_li_str = masterRenderer.todoEdit(id_suffix, element.taskName, isChecked);
        $('ul#taskList-ul').append(task_li_str);
    }
    $('#addListCardModal').modal('handleUpdate');
    $('#addListCardModal').modal('show');
}

export function openConfirmation(index) {
    deleteIndex = index;
    $("#deleteConfirmationModal").modal('show');
}

const onDataDelete = () =>  $('#deleteConfirmationModal').modal('hide');

const onDataSave = () => $('#addListCardModal').modal('hide');

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

$(document).on('click','#saveCardBtn',onSaveNewCardBtnClick );

$(document).on("click", ".deleteItem", function (e) {
    let deleteItemId = $(e.currentTarget).attr('id');
    let splitStr = deleteItemId.split('_');
    splitStr.shift();
    let substr = splitStr.join('_');
    let liId = 'li_' + substr;
    $('#' + liId).remove();
});

$(document).on("change", ".checkboxPopup", function (e) {
    timeStampObj[$(e.currentTarget).attr('id')] = Date.now();
});

$(document).on("keypress", "#addItem", function (e) {
    if (e.keyCode == 13) {
        onAddBtnClick();
    }
});

$(document).on('click', '#deleteConfirmbtn', onDeleteClick);

export function onDeleteClick(e) {
    $('#cardList').empty();
    store.dispatch({type: 'DELETE_CARD', id:Number(deleteIndex)});
    todoListModalService.deleteCardData(onDataDelete, deleteIndex);
}

