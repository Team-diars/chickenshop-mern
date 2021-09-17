import {ADD_ORDER,ATTEND_FIRST_ORDER,GET_FIRST_ORDER,ORDER_ERROR,GET_ORDERS, CLEAR_ORDER} from '../actions/types'
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
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading:false,
      }
    case GET_FIRST_ORDER: 
      return {
        ...state,
        order: action.payload,
        loading:false
      }
    case ATTEND_FIRST_ORDER:
      return {
        ...state,
        orders: state.orders.shift(),
        loading:false
      }
    case CLEAR_ORDER: 
      return {
      ...state,
      orders: [],
      loading: true
    }
    default:
      return state;
  }
}