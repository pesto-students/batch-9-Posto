import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getImage from 'get-md-image';

import BlogCard from '../BlogCard';
import { defaultContent, defaultImage } from '../../config/constants';
import { deletePost } from '../../API';

const removeMd = require('remove-markdown');

export default function BlogList({ blogs, edit, handleDelete }) {
  const conditionallyRenderBlogs = () => blogs.map((blog) => {
    const plainContent = removeMd(blog.content);
    let refactoredData = {};
    const getImageFromMarkdown = getImage(blog.content);
    if (getImage(blog.content)) {
      refactoredData = {
        ...blog,
        content: plainContent || defaultContent,
        image: getImageFromMarkdown.src,
        alt: getImageFromMarkdown.alt || 'Default Image',
      };
    } else {
      refactoredData = {
        ...blog,
        content: plainContent || defaultContent,
        image: defaultImage,
        alt: 'Default Image',
      };
    }
    return <BlogCard key={refactoredData._id} data={refactoredData} edit={edit} handleDelete={handleDelete} />;
  });

  return (
    <div>
      {conditionallyRenderBlogs()}
    </div>
  );
}

BlogList.defaultProps = {
  blogs: [],
  edit: false,
  handleDelete: null,
};

BlogList.propTypes = {
  handleDelete: PropTypes.func,
  edit: PropTypes.bool,
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
