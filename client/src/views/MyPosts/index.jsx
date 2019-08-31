import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header';
import MyPostsMenu from '../../components/MyPostsMenu';
import BlogList from '../../components/BlogList';
import Loader from '../../components/Loader';
import GlobalContext from '../../context/GlobalContext';
import CenterContainer from '../../elements/CenterContainer';
import { fetchUserPosts } from '../../API';

const MyPosts = () => {
  const { state } = useContext(GlobalContext);

  const [activeMenuItem, setActiveMenuItem] = useState('drafts');
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const handleActiveMenuItem = (changedItem) => {
    setActiveMenuItem(changedItem);
  };

  const getTypeOfData = () => {
    switch (activeMenuItem) {
      case 'drafts':
        return 'user-draft';

      case 'published':
        return 'user-published';

      case 'private':
        return 'user-private';

      default:
        return 'user-draft';
    }
  };

  const getUserId = () => state.user.id;

  const handleFetchData = async () => {
    try {
      setIsLoading(true);
      const params = {
        limit: 10,
        skip: 0,
        orderBy: 'createdAt',
        orderType: -1,
        type: getTypeOfData(),
        userId: getUserId(),
      };
      const response = await fetchUserPosts(params);
      if (!response.data.posts) {
        setError('No blogs found.');
      } else {
        setError(null);
        setBlogs(response.data.posts);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Network Error');
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [activeMenuItem]);

  const conditionallyRenderBlogs = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <CenterContainer>
          <h4>{error}</h4>
        </CenterContainer>
      );
    }
    return <BlogList blogs={blogs} />;
  };

  return (
    <>
      <Header />
      <MyPostsMenu activeItem={activeMenuItem} onClick={handleActiveMenuItem} />
      <div style={{ marginTop: '130px' }}>
        <CenterContainer>
          <h1 style={{ paddingBottom: '40px' }}>My Posts.</h1>
        </CenterContainer>
        {conditionallyRenderBlogs()}
      </div>
    </>
  );
};

export default MyPosts;
