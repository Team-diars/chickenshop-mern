import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

const initialState = {
  alerts: [],
};

export function alert(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      console.table([...state.alerts, payload]);
      return { ...state, alerts: [payload, ...state.alerts] };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== payload),
      };
    default:
      return state;
  }
}
