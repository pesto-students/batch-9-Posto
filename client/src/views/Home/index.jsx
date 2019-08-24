import React from 'react';

import { Container } from 'semantic-ui-react';
import Header from '../../components/Header';
import CategoryScrollBar from '../../components/CategoryScrollBar';

const HomePage = () => (
  <>
    <Header />
    <CategoryScrollBar />
    <Container style={{ paddingTop: '80px' }}>
      <h2>Home Page</h2>
    </Container>
  </>
);

export default HomePage;
