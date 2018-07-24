var $ = require('jquery');
import { openEditModal, openConfirmation } from './toDoListModal';
import * as saveCardState from '../service/saveCardState';
import {store} from '../index';

export function renderCards(){
    let currentState = store.getState();
    let myCards = currentState.cards;
    for (let index = 0; index < myCards.length; index++) {
        const card = myCards[index];
        //cardListData[card.id] = card;
        addCard(card);
        cardsData[card.id] = card;
    }

    console.log(store.getState())
}



export function addCard(cardData) {   

    var cardId = cardData.id;
    
    var cardHolder = document.getElementById('cardList');
    var card = document.createElement('div');
    var id = 'card_' + cardId;
    card.setAttribute('id', cardId);
    card.className = 'card';
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.setAttribute('id', 'card-body_' + cardId);
    card.appendChild(cardBody);
    var editId = 'card-edit_' + cardId;
    var deleteId = 'card-delete_' + cardId;
    var headerStr = `<div class="container">
                        <div class="row">
                            <div class="col-md-9">
                                <h5>${cardData.card.name}</h5>
                            </div>
                            <div class="col-md-3">
                                <a role="button" class="btn pl-0 pr-0" aria-label="edit" id="${editId}">
                                    <i class="far fa-edit"></i></a>
                                <a role="button" class="btn pl-0 pr-0" aria-label="delete" id="${deleteId}">
                                    <i class="fas fa-trash-alt"></i></a>
                            </div>
                        </div>
                        </div>`;
    $(cardBody).append(headerStr);

    var todoList = document.createElement('ul');
    cardBody.appendChild(todoList);
    var task = cardData.card.data;

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


    $(document).on("click", "a#" + editId, function (e) {
        let editId = $(this).attr('id');
        let index = editId.split('_')[1];
        openEditModal(index);
    });

    $(document).on("click", "a#" + deleteId, function (e) {
        let deleteId = $(this).attr('id');
        let index = deleteId.split('_')[1];
        openConfirmation(index);
    });
}

export var cardsData = {};

$( "#cardList" ).on( "sortstop", function( event, ui ) {

    $("#cardList .card").each(function (index) {
        cardsData[$(this).attr('id')].card.order = index+1;
        let cardObj = cardsData[$(this).attr('id')];
        saveCardState.saveCardState($(this).attr('id'), cardObj);
    });
    
} );

