import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { NEW_POST_CATEGORY } from '../../context/constants';
import { createPost } from '../../API';
import { useInput } from '../../hooks/index';
import Post from '../Post';
import GlobalContext from '../../context/GlobalContext';

const WritePost = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useInput('');
  const [content, setContent] = useInput('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);

  const handleIsPublicChange = () => setIsPublic(!isPublic);

  const handlePublish = async () => {
    if (title && content) {
      setIsPublishedLoading(true);
      const body = {
        title,
        content,
        category: state.newPostCategory,
        author: state.user.id,
        public: isPublic,
        published: true,
      };
      try {
        const id = await createPost(body);
        dispatch({ type: NEW_POST_CATEGORY, payload: '' });
        setPostId(id);
      } catch (err) {
        setIsSaveLoading(false);
        alert(err.message);
      }
    }
  };

  const handleSave = async () => {
    if (title && content) {
      setIsSaveLoading(true);
      const body = {
        title,
        content,
        author: state.user.id,
        category: state.newPostCategory,
        public: isPublic,
        published: false,
      };
      if (!body.category) {
        delete body.category;
      }
      try {
        const id = await createPost(body);
        dispatch({ type: NEW_POST_CATEGORY, payload: '' });
        setPostId(id);
      } catch (err) {
        setIsSaveLoading(false);
        alert(err.message);
      }
    }
  };

  let saveDisabled = true;
  let publishDisabled = true;
  if (title && content) {
    saveDisabled = false;
  }
  if (state.newPostCategory && title && content) {
    publishDisabled = false;
  }

  const [debouncedCallback] = useDebouncedCallback(
    async (body) => {
      await handleSave(body);
    }, 2500,
  );

  useEffect(() => {
    if (title && content) {
      debouncedCallback();
    }
  }, [title, content, state.newPostCategory, isPublic]);


  return (
    postId
      ? <Redirect to={`/edit/${postId}`} />
      : (
        <Post
          handlePublish={handlePublish}
          handleSave={handleSave}
          saveDisabled={saveDisabled}
          publishDisabled={publishDisabled}
          isSaveLoading={isSaveLoading}
          isPublishedLoading={isPublishedLoading}
          title={title}
          content={content}
          isPublic={isPublic}
          handleTitleChange={setTitle}
          handleContentChange={setContent}
          handleIsPublicChange={handleIsPublicChange}
        />
      )
  );
};

export default WritePost;
