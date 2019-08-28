import React from 'react';
import PropTypes from 'prop-types';
import BlogDetails from '../BlogDetails';
import styles from './BlogCard.module.css';

export default function BlogCard({ data }) {
  const {
    category, title, content, author, image,
  } = data;

  return (
    <div className={styles.container}>
      <a className={styles.cardLink} href="#here">
        <article className={styles.blogCard}>
          <img className={styles.postImage} src={image} alt="Article" />
          <BlogDetails data={{
            category,
            title,
            content,
            author,
          }}
          />
        </article>
      </a>
    </div>
  );
}

BlogCard.propTypes = {
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
    image: PropTypes.string.isRequired,
  }).isRequired,
};
