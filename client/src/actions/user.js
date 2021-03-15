import axios from 'axios'
import { setAlert } from './alert';
import {GET_USERS,USER_ERROR} from './types'
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