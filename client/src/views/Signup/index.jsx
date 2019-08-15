import React from 'react';
import { Grid } from 'semantic-ui-react';

import CenterDiv from '../../components/CenterDiv';
import Title from '../../components/Title';
import SignupForm from '../../components/SignupForm';

const Signup = () => (
  <CenterDiv>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Title as="h1">Posto</Title>
      <Title as="h2">Sign up</Title>
      <SignupForm />
    </Grid.Column>
  </CenterDiv>
);

export default Signup;
