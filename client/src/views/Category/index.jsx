import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';
import Header from '../../components/Header';
import CategoryScrollBar from '../../components/CategoryScrollBar';

const CategoryPage = ({ match, location }) => (
  <>
    <Header />
    <CategoryScrollBar />
    <Container style={{ paddingTop: '80px' }}>
      <h2>Category: {match.params.name}</h2>
      <h4>ID: {location.state.categoryId}</h4>
    </Container>
  </>
);

CategoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CategoryPage;
