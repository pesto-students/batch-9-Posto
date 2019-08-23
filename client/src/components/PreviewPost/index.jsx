import React from 'react';
import PropTypes from 'prop-types';

import Title from '../Title';
import Markdown from '../Markdown';
import styles from './PreviewPost.module.css';

const PreviewPost = ({ title, content }) => (
  <>
    <Title className={styles.title}>
      {title}
    </Title>
    <Markdown
      source={content}
    />
  </>
);

PreviewPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PreviewPost;
