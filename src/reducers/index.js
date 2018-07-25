import {combineReducers} from 'redux';
import cards from './cards';

function lastAction(state = null, action) {
  return state || action;
}

const cardsReducer = combineReducers({
    cards,
lastAction
    
  });
  
  export default cardsReducer;