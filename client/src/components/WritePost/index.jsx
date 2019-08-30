import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { createPost } from '../../API';
import Post from '../Post';
import GlobalContext from '../../context/GlobalContext';

const WritePost = () => {
  const { state } = useContext(GlobalContext);
  const [postId, setPostId] = useState('');
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
        const id = await createPost(body);
        setIsSaveLoading(false);
        setPostId(id);
      } catch (err) {
        alert(err.message);
      }
    }
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
        const id = await createPost(body);
        setIsSaveLoading(false);
        setPostId(id);
      } catch (err) {
        alert(err.message);
      }
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
        />
      )
  );
};

export default WritePost;
