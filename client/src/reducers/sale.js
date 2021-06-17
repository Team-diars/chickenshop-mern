import {ADD_SALE,SALE_ERROR} from '../actions/types';
const initialState = {
  sales: [],
  sale: null,
  loading: true,
  error: {
  }
}
export function sale(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case ADD_SALE:
      return {
        ...state,
        sales: [payload,...state.sales],
        loading:false
      }
    case SALE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}