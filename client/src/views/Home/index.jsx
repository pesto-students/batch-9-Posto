import React, { useEffect, useState, useContext, lazy } from 'react';

import Loader from '../../components/Loader';
import GlobalContext from '../../context/GlobalContext';
import { getTop10Posts } from '../../API';

const CenteredContainer = lazy(() => import('../../elements/CenterContainer'));
const Header = lazy(() => import('../../components/Header'));
const CategoryScrollBar = lazy(() => import('../../components/CategoryScrollBar'));
const BlogList = lazy(() => import('../../components/BlogList'));

const HomePage = () => {
  const { state } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await getTop10Posts(state.user.token);
      if (!response.data.posts) {
        setError('No blogs found on the topic');
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
    fetchBlogs();
  }, []);

  const conditionallyRenderBlogs = () => {
    if (error) {
      return <h4>{error}</h4>;
    }
    return <BlogList blogs={blogs} />;
  };

  return (
    isLoading
      ? <Loader />
      : (
        <>
          <Header />
          <CategoryScrollBar />
          <CenteredContainer style={{ paddingTop: '30px', paddingBottom: '50px' }}>
            <h1
              style={{ padding: '20px' }}
            >Trending Blogs
            </h1>
            {conditionallyRenderBlogs()}
          </CenteredContainer>
        </>
      )
  );
};

export default HomePage;
