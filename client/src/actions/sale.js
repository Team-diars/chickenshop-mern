import axios from 'axios'
import { setAlert } from './alert';
import {ADD_SALE,SALE_ERROR,GET_SALES,CLEAR_SALE} from './types'
//* Add Sale
export const addSale = (num_table) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/sale',num_table,config)
    dispatch({
      type:ADD_SALE,
      payload:res.data
    });
    dispatch(setAlert('Sale Added','success'));
  } catch (err) {
    console.log("MyError: ",err.response);
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
      type: SALE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
//* Get Sales
export const getSales = () => async dispatch =>{
  dispatch({ type: CLEAR_SALE });
  try {
    const res = await axios.get('/api/sale');
    dispatch({
      type: GET_SALES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: SALE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}