import React from 'react';
import PropTypes from 'prop-types';

import styles from '../BlogCard/BlogCard.module.css';

const BlogDetails = ({ data }) => {
  const {
    category, title, content, author,
  } = data;
  return (
    <div className={styles.articleDetails}>
      <h4 className={styles.postCategory}>{category}</h4>
      <h3 className={styles.postTitle}>{title}</h3>
      <p className={styles.postDescription}>{content}</p>
      <p className={styles.postAuthor}>By {author}</p>
    </div>
  );
};

BlogDetails.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogDetails;
