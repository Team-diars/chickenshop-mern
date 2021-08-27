import {REMOVE_ALERT,SET_ALERT} from '../actions/types';

const initialState = [];
//* action = type,payload(data)
export function alert(state = initialState, action){
  const { type, payload } = action;
  
  switch(type){
    case SET_ALERT:
      console.table([...state, payload]);
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}