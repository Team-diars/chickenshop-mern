import {
  GET_CART,
  ADD_PRODUCT_CART,
  ADD_QTY_PRODUCT_CART,
  REMOVE_QTY_PRODUCT_CART,
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
      const inCart =
        state.cart &&
        state.cart.find((product) => {
          if (product._id === payload._id) {
            product.quantity += payload.quantity;
            return product;
          }
        });
      return {
        ...state,
        cart: inCart ? [...state.cart] : [...state.cart, payload],
        loading: false,
      };
    case REMOVE_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== payload.id),
        loading: false,
      };
    case UPDATE_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id === payload.id) {
            product.quantity += payload.quantity;
          }
          return product;
        }),
        loading: false,
      };
    case ADD_QTY_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id === payload.id) {
            product.quantity += 1;
          }
          return product;
        }),
        loading: false,
      };
    case REMOVE_QTY_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id === payload.id) {
            product.quantity = product.quantity > 1 ? product.quantity - 1 : 1;
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
