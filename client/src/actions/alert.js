import { REMOVE_ALERT, SET_ALERT } from "./types";
import uuid from "react-uuid";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  // setTimeout(() => {
  //   dispatch({ type: REMOVE_ALERT, payload: id });
  // }, timeout);
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};
