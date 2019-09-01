import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import plugins from '../plugin';
import renderers from '../renderer';
import './Markdown.css';
import styles from './Markdown.module.css';

const Markdown = ({ source }) => {
  const err = ['!(http:/', '!(https:/', '!(http:', '!(https:', '!(http', '!(https', '!(http)', '!(https)', '!(http:)', '!(https:)', '!(http:/)', '!(https:/)'];
  const data = source.split(' ').map((word) => {
    if (err.includes(word)) {
      const correctWord = '!(https://)';
      return correctWord;
    }
    return word;
  }).join(' ');

  return (
    <div id="markdown">
      <ReactMarkdown
        escapeHtml={false}
        source={data}
        renderers={renderers}
        plugins={plugins}
        className={styles.md}
      />
    </div>
  );
};

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Markdown;
