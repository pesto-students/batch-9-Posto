import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const CenterPost = ({ children }) => (
  <Grid textAlign="center">
    <Grid.Column textAlign="center" mobile={16} tablet={12} computer={10}>
      {children}
    </Grid.Column>
  </Grid>
);

CenterPost.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenterPost;
