import {ADD_SALE,CLEAR_SALE,GET_SALES,SALE_ERROR} from '../actions/types';
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
    case GET_SALES:
        return {
          ...state,
          sales: payload,
          loading: false
        };
    case SALE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CLEAR_SALE: 
      return {
      ...state,
      sales: [],
      loading: false
    }
    default: 
      return state;
  }
}