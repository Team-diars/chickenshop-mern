import { setAlert } from "./alert";
import {
  GET_CART,
  CART_ERROR,
  UPDATE_PRODUCT_CART,
  ADD_PRODUCT_CART,
  ADD_QTY_PRODUCT_CART,
  REMOVE_QTY_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  CLEAR_CART,
} from "./types";
//* Add Product
export const addProductCart = (product) => (dispatch, getState) => {
  console.log("Agregando al carrito", product);
  // let cart = [];
  // if (localStorage.getItem("cart")) {
  //   cart = JSON.parse(localStorage.getItem("cart"));
  // console.log("CartFromLS1:", getState().cart.cart);
  // }
  // cart.push(product);
  dispatch({
    type: ADD_PRODUCT_CART,
    payload: product,
  });
  // console.log("CartFromLS2:", getState().cart.cart);

  // localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
  // console.log("Cart:", cart);
  dispatch(setAlert("Producto agregado al carrito", "success"));
};

//* Get cart
export const getCart = () => async (dispatch) => {
  // dispatch({ type: CLEAR_CART });
  // try {
  // const res = await axios.get("/api/product");
  // const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // console.log("CartListAction:", cart);
  // dispatch({
  //   type: GET_CART,
  //   payload: cart,
  // });
  // } catch (err) {
  // dispatch({
  //   type: CART_ERROR,
  //   payload: { msg: err.response.statusText, status: err.response.status }
  // })
  // }
};

//* Delete product
export const deleteProductCart = (id) => (dispatch, getState) => {
  if (window.confirm("Estas seguro de eliminar este producto del carrito?")) {
    dispatch({
      type: REMOVE_PRODUCT_CART,
      payload: id,
    });
    dispatch(setAlert("Producto eliminado del carrito", "error"));
  }
};

//* Update product
export const updateProductCart = (quantity, id) => (dispatch, getState) => {
  console.log(quantity, id);
  dispatch({
    type: UPDATE_PRODUCT_CART,
    payload: { id, quantity },
  });
  dispatch(setAlert("Producto actualizado del carrito", "success"));
};

//* Add qty product
export const addQtyProductCart = (id) => (dispatch) => {
  dispatch({
    type: ADD_QTY_PRODUCT_CART,
    payload: { id },
  });
};

//* Remove qty product
export const removeQtyProductCart = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_QTY_PRODUCT_CART,
    payload: { id },
  });
};

//* Get cart
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};
