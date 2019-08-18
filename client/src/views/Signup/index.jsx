import React from 'react';
import { Grid } from 'semantic-ui-react';

import CenterDiv from '../../components/CenterDiv';
import Title from '../../components/Title';
import SignupForm from '../../components/SignupForm';
import posto from '../../assets/posto.svg';

const Signup = () => (
  <CenterDiv>
    <Grid.Column style={{ maxWidth: 450 }}>
      <img src={posto} alt="Posto Logo" style={{ paddingTop: '5vh' }} />
      <Title as="h1">Sign up</Title>
      <SignupForm />
    </Grid.Column>
  </CenterDiv>
);

export default Signup;
