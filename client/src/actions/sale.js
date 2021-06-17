import axios from 'axios'
import { setAlert } from './alert';
import {ADD_SALE,SALE_ERROR} from './types'
//* Add Sale
export const addSale = ({num_table}) => async dispatch => {
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
    console.log(err.response);
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
