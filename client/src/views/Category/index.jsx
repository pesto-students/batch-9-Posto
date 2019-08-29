import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import axiosConfig from '../../config/axiosConfig';
import BlogList from '../../components/BlogList';
import CenterContainer from '../../elements/CenterContainer';
import Header from '../../components/Header';
import CategoryScrollBar from '../../components/CategoryScrollBar';

const CategoryPage = ({ match, location }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    const params = {
      limit: 10,
      skip: 0,
      orderBy: 'createdAt',
      orderType: -1,
      type: 'categories',
      categoryId: location.state.categoryId,
    };
    try {
      const response = await axios.get(`posts?limit=${params.limit}&skip=${params.skip}&orderby=${params.orderBy}&orderType=${params.orderType}&type=${params.type}&categoryId=${params.categoryId}`, axiosConfig);
      if (!response.data.posts) {
        setError('No blogs found on the topic');
      } else {
        setError(null);
        setBlogs(response.data.posts);
      }
    } catch (err) {
      setError('Network Error');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [location.state.categoryId]);

  const conditionallyRenderBlogs = () => {
    if (error) {
      return <h4>{error}</h4>;
    }
    return <BlogList blogs={blogs} />;
  };

  return (
    <>
      <Header />
      <CategoryScrollBar />
      <CenterContainer style={{ paddingTop: '80px' }}>
        <h2>Category: {match.params.name}</h2>
        {conditionallyRenderBlogs()}
      </CenterContainer>
    </>
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
    }).isRequired,
  }).isRequired,
};

export default CategoryPage;
