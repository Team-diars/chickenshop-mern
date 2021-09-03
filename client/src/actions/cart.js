import { setAlert } from "./alert";
import {
  GET_CART,
  CART_ERROR,
  UPDATE_PRODUCT_CART,
  ADD_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  CLEAR_CART,
} from "./types";
//* Add Product
export const addProductCart = (product) => (dispatch, getState) => {
  console.log("Agregando al carrito");
  //   if (getState().products.byId[product._id].inventory > 0) {
  //   console.log(product);
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  dispatch({
    type: ADD_PRODUCT_CART,
    payload: product,
  });
  console.log("Cart:", cart);
  dispatch(setAlert("Product Added to cart", "success"));
  //   }
  //   try {
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  // const res = await axios.post("/api/product", product, config);
  //   console.log("Agregando al carrito", product);
  //   dispatch({
  //     type: ADD_PRODUCT_CART,
  //     payload: product,
  //   });
  //   } catch (err) {
  //     const errors = err.response.data.errors;
  //     if (errors) {
  //       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  //     }
  //     dispatch({
  //       type: CART_ERROR,
  //       payload: { msg: err.response.statusText, status: err.response.status },
  //     });
  //   }
};

//* Get cart
export const getCart = () => async (dispatch) => {
  dispatch({ type: CLEAR_CART });
  try {
    // const res = await axios.get("/api/product");
    const cartList = localStorage.getItem("cart");
    console.log("CartList:", cartList);
    dispatch({
      type: GET_CART,
      payload: cartList,
    });
  } catch (err) {
    // dispatch({
    //   type: CART_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // })
  }
};

//* Delete product
export const deleteProductCart = (id) => (dispatch) => {
  if (
    window.confirm("Are you sure you want to delete this product from cart?")
  ) {
    dispatch({
      type: REMOVE_PRODUCT_CART,
      payload: id,
    });
    dispatch(setAlert("Product Removed from cart", "danger"));
    //   try {
    //     await axios.delete(`/api/product/delete/${id}`);
    //     dispatch({
    //       type: REMOVE_PRODUCT,
    //       payload: id,
    //     });
    //     dispatch(setAlert("Product Removed", "danger"));
    //   } catch (err) {
    //     dispatch({
    //       type: PRODUCT_ERROR,
    //       payload: { msg: err.response.statusText, status: err.response.status },
    //     });
    //   }
  }
};

//* Update product
export const updateProductCart = (quantity, id) => (dispatch) => {
  console.log(quantity, id);
  dispatch({
    type: UPDATE_PRODUCT_CART,
    payload: { id, quantity },
  });
  dispatch(setAlert("Product updated from cart", "success"));
  //   try {
  //     await axios.delete(`/api/product/delete/${id}`);
  //     dispatch({
  //       type: REMOVE_PRODUCT,
  //       payload: id,
  //     });
  //     dispatch(setAlert("Product Removed", "danger"));
  //   } catch (err) {
  //     dispatch({
  //       type: PRODUCT_ERROR,
  //       payload: { msg: err.response.statusText, status: err.response.status },
  //     });
  //   }
};

//* Get cart
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};
