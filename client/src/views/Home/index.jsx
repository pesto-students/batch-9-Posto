import React from 'react';

import { Container } from 'semantic-ui-react';
import Header from '../../components/Header';
import CategoryScrollBar from '../../components/CategoryScrollBar';
import BlogList from '../../components/BlogList';

const HomePage = () => (
  <>
    <Header />
    <CategoryScrollBar />
    <Container style={{ paddingTop: '30px', paddingBottom: '50px' }}>
      <h1
        style={{ paddingBottom: '20px' }}
      >Top 10 Blogs.
      </h1>
      <BlogList />
    </Container>
  </>
);

export default HomePage;
