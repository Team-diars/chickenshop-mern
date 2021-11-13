import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_CATEGORIES,
  REMOVE_CATEGORY,
  CATEGORIES_ERROR,
  EDIT_CATEGORY,
  CLEAR_CATEGORIES,
} from "./types";

//* Get Categories
export const getCategories = () => async (dispatch) => {
  dispatch({ type: CLEAR_CATEGORIES });
  try {
    const res = await axios.get("/api/category");
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLEAR_CATEGORIES,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//* Update Category
export const updateCategory = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/category", formData, config);
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert("Categoria actualizada", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
