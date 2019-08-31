/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BlogDetails from '../BlogDetails';
import styles from './BlogCard.module.css';

export default function BlogCard({ data }) {
  const {
    category, title, content, author, image, alt, _id,
  } = data;
  return (
    <div className={styles.container}>
      <Link className={styles.cardLink} to={`/post/${_id}`}>
        <article className={styles.blogCard}>
          <img className={styles.postImage} src={image} alt={alt} />
          <BlogDetails data={{
            category,
            title,
            content,
            author,
          }}
          />
        </article>
      </Link>
    </div>
  );
}

BlogCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
    alt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
