import React from 'react';
import PropTypes from 'prop-types';

import BlogCard from '../BlogCard';
import LoaderCentered from '../../elements/LoaderCentered/LoaderCenter';
import { defaultContent, defaultImage } from '../../config/constants';

export default function BlogList({ blogs }) {
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

BlogList.defaultProps = {
  blogs: [],
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      category: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      content: PropTypes.string,
      public: PropTypes.bool,
      published: PropTypes.bool,
      title: PropTypes.string,
      upvotes: PropTypes.array,
      views: PropTypes.array,
    }),
  ),
};
