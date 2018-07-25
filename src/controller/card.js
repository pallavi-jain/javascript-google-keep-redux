var $ = require('jquery');
import { openEditModal, openConfirmation } from './toDoListModal';
import * as saveCardState from '../service/saveCardState';
import {store} from '../index';
import * as masterRenderer from '../view/masterRender';

export let cardsData = {};
export function renderCards(){
    let currentState = store.getState();
    let myCards = currentState.cards;
    $('#cardList').empty();
    for (let index = 0; index < myCards.length; index++) {
        const card = myCards[index];
        //cardListData[card.id] = card;
        addCard(card);
        cardsData[card.id] = card;
    }
}

export function addCard(cardData) {   

    const cardId = cardData.id;
    
    let cardHolder = document.getElementById('cardList');
    let card = document.createElement('div');
    let id = 'card_' + cardId;
    card.setAttribute('id', cardId);
    card.className = 'card';
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.setAttribute('id', 'card-body_' + cardId);
    card.appendChild(cardBody);
    let headerStr = masterRenderer.cardHeader(cardData.card.name,cardId);
    $(cardBody).append(headerStr);

    let todoList = document.createElement('ul');
    cardBody.appendChild(todoList);
    let task = cardData.card.data;

    for (let index = 0; index < task.length; index++) {
        const element = task[index];
        let listitem = document.createElement('li');
        let checkLabel = document.createElement('label');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.className = 'form-check-input';
        checkbox.checked = element.checked;
        checkLabel.appendChild(checkbox);
        checkLabel.appendChild(document.createTextNode(element.taskName));
        listitem.appendChild(checkLabel);
        todoList.appendChild(listitem);
    }
    let divFooter = document.createElement('div');
    divFooter.className = 'card-footer text-muted';
    let footerText = cardData.card.edited ? 'Updated on ' : 'Created on '
    const date = new Date(cardData.card.date);
    let dateString = date.toDateString() + ' ' + date.toLocaleTimeString();
    divFooter.appendChild(document.createTextNode(footerText + dateString));
    card.appendChild(divFooter);
    cardHolder.appendChild(card);

    const editBtnId = 'card-edit_' + cardId;
    $(document).on("click", "a#" + editBtnId, function (e) {
        let editId = $(this).attr('id');
        let index = editId.split('_')[1];
        openEditModal(index);
    });

    const deleteBtnId = 'card-delete_'+cardId;
    $(document).on("click", "a#" + deleteBtnId, function (e) {
        let deleteId = $(this).attr('id');
        let index = deleteId.split('_')[1];
        openConfirmation(index);
    });
}

$( "#cardList" ).on( "sortstop", function( event, ui ) {
    let listArr = [];
    $("#cardList .card").each(function (index) {
        cardsData[$(this).attr('id')].card.order = index+1;
        let cardObj = cardsData[$(this).attr('id')];
        listArr.push(cardObj);
        saveCardState.saveCardState($(this).attr('id'), cardObj);
    });
    store.dispatch({type: 'REORDER_CARDS', card:listArr});
} );

