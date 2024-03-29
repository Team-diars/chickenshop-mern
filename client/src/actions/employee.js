import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_EMPLOYEES,
  EMPLOYEE_ERROR,
  GET_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  REMOVE_EMPLOYEE,
  CLEAR_EMPLOYEE,
} from "./types";
//* Get employees
export const getEmployees = () => async (dispatch) => {
  dispatch({ type: CLEAR_EMPLOYEE });
  try {
    const res = await axios.get("/api/employee");
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//* Add Employee
export const addEmployee = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/employee", formData, config);
    dispatch({
      type: ADD_EMPLOYEE,
      payload: res.data,
    });
    dispatch(setAlert("Empleado creado", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//* Update Employee
export const updateEmployee = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`/api/employee/edit/${id}`, formData, config);
    dispatch({
      type: EDIT_EMPLOYEE,
      payload: { id, employees: res.data },
    });
    history.push("/employees");
    dispatch(setAlert("Empleado actualizado", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//* Delete employee
export const deleteEmployee = (id) => async (dispatch) => {
  if (window.confirm("Estas seguro de eliminar este empleado?")) {
    try {
      await axios.delete(`/api/employee/delete/${id}`);
      dispatch({
        type: REMOVE_EMPLOYEE,
        payload: id,
      });
      dispatch(setAlert("Empleado eliminado", "error"));
    } catch (err) {
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//* Get Employee by ID
export const getEmployeeByID = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/employee/${id}`);
    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
