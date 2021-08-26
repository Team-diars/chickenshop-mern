import {UPDATE_SETTINGS,GET_SETTINGS,CLEAR_SETTINGS,SETTINGS_ERROR} from '../actions/types'
const initialState = {
  settings:null,
  loading: true,
  error: {
  }
}

export function settings(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: payload,
        loading:false
      }
    case GET_SETTINGS:
      return {
        ...state,
        settings: payload,
        loading: false
      };
    case CLEAR_SETTINGS: 
      return {
      ...state,
      settings: null,
      loading: false
    }
    case SETTINGS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}