import React from 'react';

import { Container } from 'semantic-ui-react';
import Header from '../../components/Header';

const HomePage = () => (
  <>
    <Header />
    <Container style={{ paddingTop: '80px' }}>
      <h2>Home Page</h2>
    </Container>
  </>
);

export default HomePage;
