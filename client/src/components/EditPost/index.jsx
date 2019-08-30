import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

import GlobalContext from '../../context/GlobalContext';
import { updatePost } from '../../API';
import Post from '../Post';

const EditPost = ({ postId }) => {
  const { state } = useContext(GlobalContext);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);

  const handlePublish = async () => {
    if (state.title && state.content) {
      setIsPublishedLoading(true);
      const body = {
        author: state.user.id,
        title: state.title,
        content: state.content,
        category: state.category,
        public: state.isPublic,
        published: true,
      };
      try {
        await updatePost(body, postId);
      } catch (err) {
        alert(err.message);
      }
    }
    setIsPublishedLoading(false);
  };

  const handleSave = async () => {
    if (state.title && state.content) {
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
      try {
        await updatePost(body, postId);
      } catch (err) {
        alert(err.message);
      }
      setIsSaveLoading(false);
    }
  };

  let saveDisabled = true;
  let publishDisabled = true;
  if (state.title && state.content) {
    saveDisabled = false;
  }
  if (state.category && state.title && state.content) {
    publishDisabled = false;
  }

  const [debouncedCallback] = useDebouncedCallback(
    async (body) => {
      await handleSave(body);
    }, 2500,
  );

  useEffect(() => {
    if (state.title && state.content) {
      debouncedCallback();
    }
  }, [state.title, state.content, state.category, state.isPublic]);

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
