import React, { useState, useEffect } from 'react';
import axios from 'axios';

import axiosConfig from '../../config/axiosConfig';
import BlogCard from '../BlogCard';
import LoaderCentered from '../../elements/LoaderCentered/LoaderCenter';
import { defaultContent, defaultImage } from '../../config/constants';

export default function BlogList() {
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

  const conditionallyRenderBlogs = () => {
    if (blogs.length === 0) {
      return <LoaderCentered />;
    }
    return blogs.map((blog) => {
      const refactoredData = {
        ...blog,
        content: blog.content || defaultContent,
        image: blog.image || defaultImage,
      };
      return <BlogCard key={refactoredData._id} data={refactoredData} />;
    });
  };

  return (
    <div>
      {conditionallyRenderBlogs()}
    </div>
  );
}
