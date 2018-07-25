import $ from "jquery";
import {openEditModal, openConfirmation} from './toDoListModal';
import * as saveCardState from '../service/saveCardState';
import {store} from '../index';
import * as masterRenderer from '../view/masterRender';

export const cardsData = {};
export function renderCards() {
    const currentState = store.getState(),
     myCards = currentState.cards;

    $('#cardList').empty();
    for (let index = 0; index < myCards.length; index++) {
        const card = myCards[index];
        // CardListData[card.id] = card;

        addCard(card);
        cardsData[card.id] = card;
    }
}

export function addCard(cardData) {   

    const cardId = cardData.id,
    
     cardHolder = document.getElementById('cardList'),
     card = document.createElement('div');

    card.setAttribute('id', cardId);
    card.className = 'card';
    const cardBody = document.createElement('div');

    cardBody.className = 'card-body';
    cardBody.setAttribute('id', `card-body_${cardId}`);
    card.appendChild(cardBody);
    const headerStr = masterRenderer.cardHeader(cardData.card.name, cardId);

    $(cardBody).append(headerStr);

    const todoList = document.createElement('ul');

    cardBody.appendChild(todoList);
    const task = cardData.card.data;

    for (let index = 0; index < task.length; index++) {
        const element = task[index],
         listitem = document.createElement('li'),
         checkLabel = document.createElement('label'),
         checkbox = document.createElement('input');

        checkbox.setAttribute('type', 'checkbox');
        checkbox.className = 'form-check-input';
        checkbox.checked = element.checked;
        checkLabel.appendChild(checkbox);
        checkLabel.appendChild(document.createTextNode(element.taskName));
        listitem.appendChild(checkLabel);
        todoList.appendChild(listitem);
    }
    const divFooter = document.createElement('div');

    divFooter.className = 'card-footer text-muted';
    const footerText = cardData.card.edited ? 'Updated on ' : 'Created on ',
     date = new Date(cardData.card.date),
     dateString = `${date.toDateString()} ${date.toLocaleTimeString()}`;

    divFooter.appendChild(document.createTextNode(footerText + dateString));
    card.appendChild(divFooter);
    cardHolder.appendChild(card);

    const editBtnId = `card-edit_${cardId}`;

    $(document).on("click", `a#${editBtnId}`, function () {
        const editId = $(this).attr('id'),
         index = editId.split('_')[1];

        openEditModal(index);
    });

    const deleteBtnId = `card-delete_${cardId}`;

    $(document).on("click", `a#${deleteBtnId}`, function () {
        const deleteId = $(this).attr('id'),
         index = deleteId.split('_')[1];

        openConfirmation(index);
    });
}

$( "#cardList" ).on( "sortstop", function( ) {
    const listArr = [];

    $("#cardList .card").each(function (index) {
        cardsData[$(this).attr('id')].card.order = index + 1;
        const cardObj = cardsData[$(this).attr('id')];

        listArr.push(cardObj);
        saveCardState.saveCardState($(this).attr('id'), cardObj);
    });
    store.dispatch({"type": 'REORDER_CARDS',
"card": listArr});
} );