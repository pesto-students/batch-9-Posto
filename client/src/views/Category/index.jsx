import React, { useState, useEffect, lazy } from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader';
import { fetchCategoryBlogs } from '../../API';

const CenterContainer = lazy(() => import('../../elements/CenterContainer'));
const Header = lazy(() => import('../../components/Header'));
const CategoryScrollBar = lazy(() => import('../../components/CategoryScrollBar'));
const BlogList = lazy(() => import('../../components/BlogList'));

const CategoryPage = ({ match, location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const categoryId = location.state ? location.state.categoryId : undefined;

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const params = {
        limit: 10,
        skip: 0,
        orderBy: 'createdAt',
        orderType: -1,
        type: 'categories',
        categoryId,
      };
      const response = await fetchCategoryBlogs(params);
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
    if (categoryId) {
      fetchBlogs();
    }
  }, [categoryId]);

  const conditionallyRenderBlogs = () => {
    if (error) {
      return <h2 style={{ paddingTop: '30px' }}>{error}</h2>;
    }
    return <BlogList blogs={blogs} />;
  };

  return (
    isLoading
      ? <Loader />
      : (
        <>
          <Header />
          <CategoryScrollBar selectedCategory={categoryId} />
          <CenterContainer>
            {conditionallyRenderBlogs()}
          </CenterContainer>
        </>
      )
  );
};

CategoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default CategoryPage;
