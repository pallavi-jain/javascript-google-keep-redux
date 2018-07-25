  
  
  export default function cards(state = [], action) {
    let newState = [];  

    switch (action.type) {

        case 'ADD_CARD':
        case 'GET_CARDS':
            return state.concat(action.card);

        case 'DELETE_CARD':
            return state.filter((card) => card.id !== action.id);

        case 'EDIT_CARD':
             return state.map((card) => card.id === action.card.id ? action.card : card);
             
        case 'REORDER_CARDS':
            newState = [];
            const tmp = newState.concat(state);

             
return tmp.sort((a, b) => a.card.order - b.card.order);
             
        default:
            return state;
    }
  }