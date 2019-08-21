import React from 'react';
import { Container } from 'semantic-ui-react';

const PostContent = ({ children }) => (
  <Container textAlign="left" text>
    {children}
  </Container>
);

export default PostContent;
