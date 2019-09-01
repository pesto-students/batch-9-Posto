import React, { useState, useEffect, useContext, lazy } from 'react';

import Loader from '../../components/Loader';
import GlobalContext from '../../context/GlobalContext';
import { fetchUserPosts } from '../../API';

const CenterContainer = lazy(() => import('../../elements/CenterContainer'));
const BlogList = lazy(() => import('../../components/BlogList'));
const MyPostsMenu = lazy(() => import('../../components/MyPostsMenu'));
const Header = lazy(() => import('../../components/Header'));

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
    } catch (err) {
      setError('Network Error');
    }
    setIsLoading(false);
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
          <h2>{error}</h2>
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
