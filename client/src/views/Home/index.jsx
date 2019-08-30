import React, { useEffect, useState } from 'react';

import Loader from '../../components/Loader';
import { getTop10Posts } from '../../API';
import CenteredContainer from '../../elements/CenterContainer';
import Header from '../../components/Header';
import CategoryScrollBar from '../../components/CategoryScrollBar';
import BlogList from '../../components/BlogList';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await getTop10Posts();
      if (!response.data.posts) {
        setError('No blogs found on the topic');
      } else {
        setError(null);
        setBlogs(response.data.posts);
      }
      setIsLoading(false);
    } catch (err) {
      setError('Network Error');
    }
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
              style={{ paddingBottom: '20px' }}
            >Top 10 Blogs.
            </h1>
            {conditionallyRenderBlogs()}
          </CenteredContainer>
        </>
      )
  );
};

export default HomePage;
