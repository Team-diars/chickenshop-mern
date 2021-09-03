import {
  GET_CART,
  ADD_PRODUCT_CART,
  UPDATE_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  CART_ERROR,
  CLEAR_CART,
} from "../actions/types";
const initialState = {
  cart: [],
  product: null,
  loading: true,
  error: {},
};
export function cart(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CART:
      return {
        ...state,
        cart: payload,
        loading: false,
      };
    case ADD_PRODUCT_CART:
      return {
        ...state,
        cart: [payload, ...state.cart],
        loading: false,
      };
    case REMOVE_PRODUCT_CART:
      console.log(
        "remove:",
        payload,
        state.cart.filter((product) => product._id !== payload),
        state.cart
      );
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== payload),
        loading: false,
      };
    case UPDATE_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id === payload.id) {
            product.quantity = payload.quantity;
          }
          return product;
        }),
        loading: false,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        loading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        error: payload,
        loading: true,
      };
    default:
      return state;
  }
}
