import React from 'react';
import PropTypes from 'prop-types';

const iFrame = ({ data: { hProperties: { src } } }) => (
  <div>
    <iframe
      width="420"
      height="315"
      src={src}
      frameBorder="0"
      allowFullScreen
      title=" Your video"
    />
  </div>
);

iFrame.propTypes = {
  data: PropTypes.shape({
    hProperties: PropTypes.shape({
      src: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default iFrame;
