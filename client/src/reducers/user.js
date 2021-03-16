import {USER_ERROR,GET_USERS} from '../actions/types'
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {
  }
}
export function user(state = initialState, action){
  const { type, payload } = action;
  switch(type){
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