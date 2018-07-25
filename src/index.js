var $ = require('jquery');
require('jquery-ui');
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');
import {createStore} from 'redux';
import cardsReducer from './reducers/index';
import {renderCards} from './controller/card';
import 'bootstrap'
import '../styles/sass/styles.scss';
import * as cardService from './service/getCards';

export const store = createStore(cardsReducer);

store.subscribe(render);
function render(){
    renderCards();
}
$( document ).ready(function() {
    cardService.getCards();   
});
$( function() {
    $( "#taskList-ul" ).sortable();
    $( "#taskList-ul" ).disableSelection();

    $( "#cardList" ).sortable({});
    $( "#cardList" ).disableSelection();
  } );


