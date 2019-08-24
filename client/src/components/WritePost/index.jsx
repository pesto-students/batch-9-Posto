import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { createPost } from '../../API';
import Post from '../Post';
import PostContext from '../../Context/PostContext';

const WritePost = () => {
  const { state } = useContext(PostContext);
  const [postId, setPostId] = useState('');
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);

  const handlePublish = async () => {
    setIsPublishedLoading(true);
    const body = {
      author: '5d5d60a51930b06b21e65765',
      title: state.title,
      content: state.content,
      category: state.category,
      public: state.isPublic,
      published: true,
    };
    const id = await createPost(body);
    setPostId(id);
  };

  const handleSave = async () => {
    setIsSaveLoading(true);
    const body = {
      author: '5d5d60a51930b06b21e65765',
      title: state.title,
      content: state.content,
      category: state.category,
      public: state.isPublic,
      published: false,
    };
    if (!body.category) {
      delete body.category;
    }
    const id = await createPost(body);
    setPostId(id);
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
