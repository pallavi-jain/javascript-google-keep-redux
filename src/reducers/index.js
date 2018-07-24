import { combineReducers } from 'redux';
import cards from './cards';

const cardsReducer = combineReducers({
    cards: cards, lastAction: lastAction
    
  });

function lastAction(state = null, action) {
    return action;
  }
  
  export default cardsReducer;