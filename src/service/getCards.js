var $ = require('jquery');
import {addCard, cardsData} from '../controller/card'
import {store} from '../index';
import cardsReducer from '../reducers/cards'
export var cardListData = {};
export var totalCards = 0;
import {createStore} from 'redux';
export function getCards(){

    $.get("http://localhost:3000/lists", function(data, status){
        
        let myLists = data;
        $('#cardList').empty();
        totalCards = myLists.length;
        myLists.sort(function (a, b) {
            return a.card.order - b.card.order;
          });
          
          store.dispatch({ type: 'GET_CARDS' , card:myLists});
          
        for (let index = 0; index < myLists.length; index++) {
            const card = myLists[index];
            cardListData[card.id] = card;
            // addCard(card);
            // cardsData[card.id] = card;
            
        }
    });

    function render(){
        console.log('heyyyyy')
    }

}