import {USER_ERROR,EDIT_USER,GET_USERS, ADD_USER, GET_USER, REMOVE_USER, CLEAR_USER} from '../actions/types'
const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {
  }
}
export function user(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case ADD_USER:
      return {
        ...state,
        users: [payload,...state.users],
        loading:false
    }
    case EDIT_USER:
      if (state.user._id === payload.id){
        const {users:{password}} = payload;
        return {
          ...state,
          user: [...state.users, {password}]
        }
      }else{
        return user
    }
    case REMOVE_USER: 
      return {
        ...state,
        users: state.users.filter(usr => usr._id !== payload),
        loading: false
    }
    case CLEAR_USER: 
      return {
      ...state,
      users: [],
      loading: false
    }
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}