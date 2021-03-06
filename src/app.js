import $ from "jquery";
window.$ = $;
import 'jquery-ui';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';

import * as cardService from './service/getCards';
import * as masterRenderer from './view/masterRender';

$(document).ready(function() {
    $('body').append(masterRenderer.addCardModal());
    $('body').append(masterRenderer.addOpenConfirmation());
    cardService.getCards();   
});

$( function() {
    $( "#taskList-ul" ).sortable();
    $( "#taskList-ul" ).disableSelection();
    $( "#cardList" ).sortable({});
    $( "#cardList" ).disableSelection();
  } );