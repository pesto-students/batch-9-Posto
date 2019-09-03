/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
import BlogDetails from '../BlogDetails';
import styles from './BlogCard.module.css';

export default function BlogCard({ data, edit, handleDelete, editRedirection }) {
  const {
    category, title, content, author, image, alt, _id,
  } = data;

  const conditionallyShowButtons = () => {
    if (edit) {
      return (
        <div
          style={{
            textAlign: 'center',
            marginBottom: '50px',
          }}
        >
          <Button as={Link} to={`/edit/${_id}`}>Edit</Button>
          <Button
            negative
            onClick={() => handleDelete(_id)}
          >
            Delete
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.container}>
        <Link className={styles.cardLink} to={`/${editRedirection ? 'edit' : 'post'}/${_id}`}>
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
      <Container>
        {conditionallyShowButtons()}
      </Container>
    </>
  );
}

BlogCard.defaultProps = {
  edit: false,
  handleDelete: null,
};

BlogCard.propTypes = {
  handleDelete: PropTypes.func,
  edit: PropTypes.bool,
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
    alt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
