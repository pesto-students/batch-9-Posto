import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import GlobalContext from '../../context/GlobalContext';
import { updatePost } from '../../API';
import Post from '../Post';

const EditPost = ({ postId }) => {
  const { state } = useContext(GlobalContext);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);

  const handlePublish = async () => {
    setIsPublishedLoading(true);
    const body = {
      author: state.user.id,
      title: state.title,
      content: state.content,
      category: state.category,
      public: state.isPublic,
      published: true,
    };
    await updatePost(body, postId);
    setIsPublishedLoading(false);
  };

  const handleSave = async () => {
    setIsSaveLoading(true);
    const body = {
      author: state.user.id,
      title: state.title,
      content: state.content,
      category: state.category,
      public: state.isPublic,
      published: false,
    };
    if (!body.category) {
      delete body.category;
    }
    await updatePost(body, postId);
    setIsSaveLoading(false);
  };

  let saveDisabled = true;
  let publishDisabled = true;
  if (state.title && state.content) {
    saveDisabled = false;
  }
  if (state.category && state.title && state.content) {
    publishDisabled = false;
  }
  return (
    <Post
      handlePublish={handlePublish}
      handleSave={handleSave}
      saveDisabled={saveDisabled}
      publishDisabled={publishDisabled}
      isSaveLoading={isSaveLoading}
      isPublishedLoading={isPublishedLoading}
    />
  );
};

EditPost.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default EditPost;
