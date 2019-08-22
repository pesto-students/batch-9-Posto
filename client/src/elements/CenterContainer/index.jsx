import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const CenterContainer = (props) => {
  const { children } = props;
  return (
    <Container {...props}>
      {children}
    </Container>
  );
};

CenterContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenterContainer;
