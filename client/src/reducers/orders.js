import {ADD_ORDER,ORDER_ERROR} from '../actions/types'
const initialState = {
  orders: [],
  product: null,
  loading: true,
  error: {
  }
}
export function order(state = initialState, action){
  switch(action.type){
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading:false
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading:true
      };
    default:
      return state;
  }
}