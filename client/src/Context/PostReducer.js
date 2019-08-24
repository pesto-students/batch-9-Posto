import {
  title, content, category, activeTab, categoryOptions, isPublic,
} from './constants';

export default function reducer(state, action) {
  switch (action.type) {
    case title: return {
      ...state,
      title: action.payload,
    };
    case content:
      return {
        ...state,
        content: action.payload,
      };
    case category:
      return {
        ...state,
        category: action.payload,
      };
    case activeTab:
      return {
        ...state,
        activeTab: action.payload,
      };
    case categoryOptions:
      return {
        ...state,
        categoryOptions: action.payload,
      };
    case isPublic:
      return {
        ...state,
        isPublic: action.payload,
      };
    default:
      return state;
  }
}
