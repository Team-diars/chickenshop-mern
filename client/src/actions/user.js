import axios from 'axios'
import { setAlert } from './alert';
import {GET_USERS,USER_ERROR,ADD_USER, EDIT_USER, REMOVE_USER} from './types'
//* Get posts
export const getUsers = () => async dispatch =>{
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
    dispatch({
      type:EDIT_USER,
      payload: {id, users: res.data}
    });
    history.push('/users');
    dispatch(setAlert('User Updated','success'));
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

//* Delete User
export const deleteProduct = (id) => async dispatch =>{
  if (window.confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`/api/user/delete/${id}`);
      dispatch({
        type: REMOVE_USER,
        payload: id
      })
      dispatch(setAlert('User Removed','danger'));
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }
  }
}