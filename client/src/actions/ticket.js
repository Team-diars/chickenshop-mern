import axios from 'axios'
import { setAlert } from './alert';
import {GET_TICKETS,ADD_TICKET, TICKET_ERROR, CLEAR_TICKET, REMOVE_TICKET, UPDATE_TICKET} from './types'

//* Add Ticket
export const addTicket = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/ticket',formData,config)
    dispatch({
      type:ADD_TICKET,
      payload:res.data
    });
    dispatch(setAlert('Ticket Added','success'));
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
//* Get tickets
export const getTickets = () => async dispatch =>{
  dispatch({ type: CLEAR_TICKET });
  try {
    const res = await axios.get('/api/ticket');
    dispatch({
      type: GET_TICKETS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}