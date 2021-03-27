import {PRODUCT_ERROR,GET_PRODUCTS, ADD_PRODUCT} from '../actions/types'
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
    case ADD_PRODUCT:
      return {
        ...state,
        posts: [payload,...state.posts],
        loading:false
      }
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