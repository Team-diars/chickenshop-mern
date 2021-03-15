import {EMPLOYEE_ERROR,GET_EMPLOYEES} from '../actions/types'
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {
  }
}
export function employee(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
        loading: false
      };
    case EMPLOYEE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}