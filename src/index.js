
import {createStore} from 'redux';
import cardsReducer from './reducers/index';
import {renderCards} from './controller/card';
import 'bootstrap';
import '../styles/sass/styles.scss';

import './app';

export const store = createStore(cardsReducer);
store.subscribe(render);
function render() {
    renderCards();
}