import axios from 'axios'
import { setAlert } from './alert';
import {ADD_ORDER, ORDER_ERROR} from './types'

//* Add Order
export const addOrder = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/menu',formData,config)
    dispatch({
      type:ADD_ORDER,
      payload:res.data
    });
    dispatch(setAlert('Order Added','success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}