import React from 'react';
import PropTypes from 'prop-types';

import styles from '../BlogCard/BlogCard.module.css';

const BlogDetails = ({ data }) => {
  const {
    category, title, content, author,
  } = data;
  return (
    <div className={styles.articleDetails}>
      <h4 className={styles.postCategory}>{category ? category.name : 'Category'}</h4>
      <h3 className={styles.postTitle}>{title}</h3>
      <p className={styles.postDescription}>{`${content.slice(0, 75)}...`}</p>
      <p className={styles.postAuthor}>By {author.name}</p>
    </div>
  );
};

BlogDetails.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogDetails;
