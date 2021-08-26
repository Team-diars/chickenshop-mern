import axios from 'axios'
import { setAlert } from './alert';
import {GET_USERS,USER_ERROR,ADD_USER, EDIT_USER, REMOVE_USER, CLEAR_USER, GET_USER} from './types'

//* Get Users
export const getUsers = () => async dispatch =>{
  dispatch({ type: CLEAR_USER });
  try {
    const res = await axios.get('/api/user');
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//* Get User By ID
export const getUserByID = (id) => async dispatch =>{
  try {
    const res = await axios.get(`/api/user/${id}`);
    console.log(res);
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response)
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//* Add User
export const addUser = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/user',formData,config)
    dispatch({
      type:ADD_USER,
      payload:res.data
    });
    dispatch(setAlert('User Added','success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//* Update User
export const updateUser = (id,formData,history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put(`/api/user/edit/${id}`,formData,config)
    console.log("RES >>", res.data);
    dispatch({
      type:EDIT_USER,
      payload: {id, users: res.data}
    });
    history.push('/users');
    dispatch(setAlert('User Updated','success'));
  } catch (err) {
    console.log(err.response);
    // const errors = err.response.data.errors;
    // if(errors){
    //   errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    // }
    // dispatch({
    //   type: USER_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // })
  }
}

//* Delete User
export const deleteUser = (id) => async dispatch =>{
  if (window.confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`/api/user/delete/${id}`);
      dispatch({
        type: REMOVE_USER,
        payload: id
      })
      dispatch(setAlert('User Removed','danger'));
    } catch (err) {
      console.log(err.response);
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }
  }
}