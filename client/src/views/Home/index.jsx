import React, { useEffect, useState } from 'react';
import axios from 'axios';

import axiosConfig from '../../config/axiosConfig';
import CenteredContainer from '../../elements/CenterContainer';
import Header from '../../components/Header';
import CategoryScrollBar from '../../components/CategoryScrollBar';
import BlogList from '../../components/BlogList';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const params = {
      limit: 10,
      skip: 0,
      orderBy: 'createdAt',
      orderType: -1,
    };
    const response = await axios.get(`posts?limit=${params.limit}&skip=${params.skip}&orderby=${params.orderBy}&orderType=${params.orderType}`, axiosConfig);
    setBlogs(response.data.posts);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Header />
      <CategoryScrollBar />
      <CenteredContainer style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h1
          style={{ paddingBottom: '20px' }}
        >Top 10 Blogs.
        </h1>
        <BlogList blogs={blogs} />
      </CenteredContainer>
    </>
  );
};

export default HomePage;
