import React from 'react';

const initialState = {
  title: '',
  content: '',
  category: '',
  activeTab: 'write',
  categoryOptions: [],
  isPublic: true,
};

const PostContext = React.createContext(initialState);

export default PostContext;
