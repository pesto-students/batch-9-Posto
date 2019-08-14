import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const CenterDiv = ({ children }) => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    {children}
  </Grid>
);

CenterDiv.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CenterDiv;
