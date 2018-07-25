import {combineReducers} from 'redux';
import cards from './cards';

const cardsReducer = combineReducers({
    cards,
lastAction
    
  });

function lastAction(state = null, action) {
    return action;
  }
  
  export default cardsReducer;