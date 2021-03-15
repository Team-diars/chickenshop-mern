import {PRODUCT_ERROR,GET_PRODUCTS} from '../actions/types'
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {
  }
}
export function product(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}