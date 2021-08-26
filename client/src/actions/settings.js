import axios from 'axios'
import { setAlert } from './alert';
import {UPDATE_SETTINGS,CLEAR_SETTINGS,SETTINGS_ERROR, GET_SETTINGS} from './types'

//* Get Settings 
export const getSettings = () => async dispatch =>{
  dispatch({ type: CLEAR_SETTINGS });
  try {
    const res = await axios.get('/api/settings');
    dispatch({
      type: GET_SETTINGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CLEAR_SETTINGS,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//* Update Settings
export const updateSettings = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/settings',formData,config)
    dispatch({
      type:UPDATE_SETTINGS,
      payload:res.data
    });
    dispatch(setAlert('Settings updated','success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
      type: SETTINGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}