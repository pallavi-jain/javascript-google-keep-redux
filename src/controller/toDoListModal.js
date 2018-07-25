var $ = require('jquery');
require('jquery-ui');
import * as todoListModalService from '../service/toDoListModalService';
import * as getCardsService from '../service/getCards';
import {store} from '../index';

$('#addNewItem').click(onAddBtnClick);
let editModeId;
let editMode = false;
let timeStampObj = {};
var deleteIndex;
export function onAddBtnClick() {

    let itemIndex = $("ul#taskList-ul").children().length + 1;
    let taskItem = $('#addItem').val().trim();
    if (taskItem) {
        let task_li_str;
        if (!editMode) {
            task_li_str = `<li class="mb-2 ml-4" id="li_${itemIndex}">
                            <div class="row">
                                <div id="task_${itemIndex}" class="task col-sm-11 modalInput">
                                    <span>${taskItem}</span></div>
                                <div class='col-sm-1 pl-0'>
                                    <button id="removeBtn_${itemIndex}" type="button" class="btn btn-primary btn-sm deleteItem"> X </button></div>
                                </div>
                            </li>`;
        } else {
            const id_suffix = editModeId + '_' + itemIndex;
            let taskItem = $('#addItem').val().trim();
            task_li_str = `<li class="mb-2 ml-4" id="li_${id_suffix}">
                            <div class="row">
                                <div class="col-md-11">
                                    <input type="checkbox" id="check_${id_suffix}" class="form-check-input mt-3 checkboxPopup">
                                        <input id="input_${id_suffix}" class="form-control modalInput" type="text" value="${taskItem}"></div>
                                <div class="col-md-1 pl-0"><button id="removeBtn_${id_suffix}" type="button" class="btn btn-primary btn-sm deleteItem"> X </button>
                            </div></div>
                            </li>`
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
    if (!editMode) {
        $("ul#taskList-ul li").each(function (index) {
            let taskObj = {};
            taskObj.checked = false;
            let liId = $(this).attr('id');
            let splitStr = liId.split('_');
            splitStr.shift();
            let substr = splitStr.join('_');
            let taskId = 'task_' + substr;
            taskObj.taskName = String($('#' + taskId + ' span').text()).trim();
            taskObj.date = Date.now();
            cardInfo.data.push(taskObj);
            cardInfo.order = getCardsService.totalCards + 1;
        });
    } else {
        $("ul#taskList-ul li").each(function (index) {
            let taskObj = {};
            let liId = $(this).attr('id');
            let splitStr = liId.split('_');
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
        let task_li_str = `<li class="mb-2 ml-4" id="li_${id_suffix}" data-createDate="${element.date}">
                            <div class="row">
                            <div class="col-md-11">
                                <input type="checkbox" id="check_${id_suffix}" ${isChecked} class="form-check-input mt-3 checkboxPopup">
                                <input id="input_${id_suffix}" class="form-control modalInput" type="text"  value="${element.taskName}"></div><div class="col-md-1 pl-0">
                                <button id="removeBtn_${id_suffix}" type="button" class="btn btn-primary btn-sm deleteItem"> X </button>
                                </div>
                            </div>
                            </li>`
        $('ul#taskList-ul').append(task_li_str);
    }
    $('#addListCardModal').modal('handleUpdate');
    $('#addListCardModal').modal('show');
}

export function openConfirmation(index) {
    deleteIndex = index;
    $("#deleteConfirmationModal").modal('show');
}

var deletebtn = document.getElementById('deleteConfirmbtn');
deletebtn.addEventListener('click', onDeleteClick);

function onDeleteClick(e) {
    $('#cardList').empty();
    store.dispatch({type: 'DELETE_CARD', id:Number(deleteIndex)});
    todoListModalService.deleteCardData(onDataDelete, deleteIndex);
}

function onDataDelete() {
    $('#deleteConfirmationModal').modal('hide');
    //getCardsService.getCards();
}

function onDataSave() {
    $('#addListCardModal').modal('hide');
    //getCardsService.getCards();
}

$('#addListCardModal').on('shown.bs.modal', function () {
    $('#todoListTitle').trigger('focus')
});

$('#addListCardModal').on('hidden.bs.modal', function (e) {
    editMode = false;
    editModeId = undefined;
    deleteIndex = undefined;
    timeStampObj = {};
    $('#taskList-ul').empty();
    $('#todoListTitle').val('');
    $('#addItem').val('');
});

var saveNewCardBtn = document.getElementById('saveCardBtn');
saveNewCardBtn.addEventListener('click', onSaveNewCardBtnClick);

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

$('#addItem').keypress(function (e) {
    if (e.keyCode == 13) {
        onAddBtnClick();
    }
});