import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const Title = ({ as, children }) => <Header color="teal" as={as}>{children}</Header>;

Title.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  children: PropTypes.string.isRequired,
};

export default Title;
