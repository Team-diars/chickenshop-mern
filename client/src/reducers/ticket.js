import {GET_TICKETS,GET_TICKET,ADD_TICKET, TICKET_ERROR, CLEAR_TICKET, REMOVE_TICKET, EDIT_TICKET} from '../actions/types';
const initialState = {
  tickets: [],
  ticket: null,
  loading: true,
  error: {
  }
}

export function ticket(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case ADD_TICKET:
      return {
        ...state,
        tickets: [payload,...state.tickets],
        loading:false
      }
    case GET_TICKETS:
      return {
        ...state,
        tickets: payload,
        loading: false
      };
    case GET_TICKET:
      return {
        ...state,
        ticket: payload,
        loading: false
      };
    case EDIT_TICKET:
      if (state.ticket._id === payload.id){
        const {tickets:{product}} = payload;
        return {
          ...state,
          ticket: [...state.tickets, {product}]
        }
      }else{
        return ticket
      }
    case REMOVE_TICKET: 
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket._id !== payload),
        loading: false
      }
    case CLEAR_TICKET: 
      return {
      ...state,
      tickets: [],
      loading: false
    }
    case TICKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}