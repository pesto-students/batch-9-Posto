import React from 'react';

const initialState = {
  user: {},
  title: '',
  content: '',
  category: '',
  activeTab: 'write',
  categoryOptions: [],
  isPublic: true,
};

const GlobalContext = React.createContext(initialState);

export default GlobalContext;
