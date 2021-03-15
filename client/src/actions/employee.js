import axios from 'axios'
import { setAlert } from './alert';
import {GET_EMPLOYEES,EMPLOYEE_ERROR} from './types'
//* Get employees
export const getEmployees = () => async dispatch =>{
  try {
    const res = await axios.get('/api/employee');
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}