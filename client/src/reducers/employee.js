import {ADD_EMPLOYEE, CLEAR_EMPLOYEE, EDIT_EMPLOYEE, EMPLOYEE_ERROR,GET_EMPLOYEE,GET_EMPLOYEES, REMOVE_EMPLOYEE} from '../actions/types'
const initialState = {
  employees: [],
  employee: null,
  loading: true,
  error: {
  }
}
export function employee(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [payload,...state.employees],
        loading:false
      }
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
        loading: false
      };
    case GET_EMPLOYEE:
      return {
        ...state,
        employee: payload,
        loading: false
      };
    case EDIT_EMPLOYEE:
      if (state.employee._id === payload.id){
        const {employees:{_id,name, lastname, role, dni, address, email}} = payload;
        return {
          ...state,
          employee: [...state.employees, {_id,name, lastname, role, dni, address, email}]
        }
      }else{
        return employee
      }
    case REMOVE_EMPLOYEE: 
      return {
        ...state,
        employees: state.employees.filter(employee => employee._id !== payload),
        loading: false
      }
    case CLEAR_EMPLOYEE: 
      return {
      ...state,
      employees: [],
      loading: false
      }
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