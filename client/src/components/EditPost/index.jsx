import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

import {
  TITLE, CONTENT, IS_PUBLIC,
} from '../../context/constants';
import GlobalContext from '../../context/GlobalContext';
import { updatePost } from '../../API';
import Post from '../Post';

const EditPost = ({ postId }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);

  const onTitleChange = (event) => dispatch({ type: TITLE, payload: event.target.value });
  const onContentChange = (event) => dispatch({ type: CONTENT, payload: event.target.value });
  const onPublicChange = () => dispatch({ type: IS_PUBLIC, payload: !state.isPublic });

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
      title={state.title}
      content={state.content}
      isPublic={state.isPublic}
      handleTitleChange={onTitleChange}
      handleContentChange={onContentChange}
      handleIsPublicChange={onPublicChange}
    />
  );
};

EditPost.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default EditPost;
