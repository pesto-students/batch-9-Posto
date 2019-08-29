import {
  LOGOUT, USER, TITLE, CONTENT, CATEGORY, ACTIVE_TAB, CATEGORY_OPTIONS, IS_PUBLIC,
} from './constants';
import initialState from './initialState';

export default function reducer(state, action) {
  switch (action.type) {
    case USER: return {
      ...state,
      user: action.payload,
    };
    case TITLE: return {
      ...state,
      title: action.payload,
    };
    case CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    case CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    case CATEGORY_OPTIONS:
      return {
        ...state,
        categoryOptions: action.payload,
      };
    case IS_PUBLIC:
      return {
        ...state,
        isPublic: action.payload,
      };
    case LOGOUT: return initialState;
    default:
      return state;
  }
}
