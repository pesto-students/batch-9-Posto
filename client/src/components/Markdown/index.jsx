import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import plugins from '../plugin';
import renderers from '../renderer';
import './Markdown.css';

const Markdown = ({ source }) => (
  <div id="markdown">
    <ReactMarkdown
      source={source}
      renderers={renderers}
      plugins={plugins}
    />
  </div>
);

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Markdown;
