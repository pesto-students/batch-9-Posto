import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const Title = ({ as, children, ...props }) => <Header as={as} {...props}>{children}</Header>;

Title.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Title.defaultProps = {
  color: 'teal',
  as: 'h1',
};

export default Title;
