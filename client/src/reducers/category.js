import {
  CLEAR_CATEGORIES,
  GET_CATEGORIES,
  GET_CATEGORY,
  REMOVE_CATEGORY,
  ADD_CATEGORY,
  CATEGORIES_ERROR,
  EDIT_CATEGORY,
} from "../actions/types";

const initialState = {
  categories: [],
  category: null,
  loading: true,
  error: {},
};

export function category(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
        loading: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case EDIT_CATEGORY:
      if (state.category._id === payload.id) {
        const {
          categories: { _id, name },
        } = payload;
        return {
          ...state,
          category: [...state.categories, { _id, name }],
        };
      } else {
        return category;
      }
    case REMOVE_CATEGORY:
      return state.filter((category) => category.id !== payload);
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
        loading: false,
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
