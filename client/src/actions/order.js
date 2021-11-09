import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_ORDER,
  GET_FIRST_ORDER,
  ORDER_ERROR,
  GET_ORDERS,
  CLEAR_ORDER,
  ATTEND_FIRST_ORDER,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//* Add Order
export const addOrder = (formData) => async (dispatch) => {
  console.log("Action Order:", formData);
  try {
    const res = await axios.post("/api/menu", formData, config);
    dispatch({
      type: ADD_ORDER,
      payload: res.data,
    });
    dispatch(setAlert("Order Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//* Get Orders
export const getOrders = () => async (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
  try {
    const res = await axios.get("/api/order", config);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//* Get First Order
export const getFirstOrder = () => async (dispatch) => {
  const res = await axios.get("/api/order/first", config);
  // console.log("res: ",res);
  try {
    dispatch({
      type: GET_FIRST_ORDER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//* Attend First Order
export const attendFirstOrder = () => async (dispatch) => {
  const res = await axios.delete("/api/order/first", config);
  // console.log("res: ",res);
  try {
    dispatch({
      type: ATTEND_FIRST_ORDER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
