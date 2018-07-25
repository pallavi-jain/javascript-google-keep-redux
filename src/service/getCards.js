import $ from 'jquery';
import {store} from '../index';
export const cardListData = {};
export let totalCards = 0;
export function getCards() {

    $.get("http://localhost:3000/lists", function(data) {
        
        const myLists = data;

       
        $('#cardList').empty();
        totalCards = myLists.length;
        myLists.sort(function (a, b) {
            return a.card.order - b.card.order;
          });
          
          store.dispatch({"type": 'GET_CARDS',
"card": myLists});
          
        for (let index = 0; index < myLists.length; index++) {
            const card = myLists[index];

            cardListData[card.id] = card;
            // AddCard(card);
            // CardsData[card.id] = card;
            
        }
    });

}