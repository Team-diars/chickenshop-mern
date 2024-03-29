import {PRODUCT_ERROR,GET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_PRODUCT, GET_PRODUCT, EDIT_PRODUCT} from '../actions/types'
const initialState = {
  products: [],
  product: null,
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
        products: [payload,...state.products],
        loading:false
      }
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false
      };
    case EDIT_PRODUCT:
      if (state.product._id === payload.id){
        const {products:{_id,category,description,name,price}} = payload;
        return {
          ...state,
          product: [...state.products, {_id,category,description,name,price}]
        }
      }else{
        return product
      }
    case REMOVE_PRODUCT: 
      return {
        ...state,
        products: state.products.filter(product => product._id !== payload),
        loading: false
      }
    case CLEAR_PRODUCT: 
      return {
      ...state,
      products: [],
      loading: false
    }
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