import React from 'react';
import { Grid } from 'semantic-ui-react';

import CenterDiv from '../../components/CenterDiv';
import LoginForm from '../../components/LoginForm';
import Title from '../../components/Title';
import posto from '../../assets/posto.svg';

const Login = () => (
  <CenterDiv>
    <Grid.Column style={{ maxWidth: 450 }}>
      <img src={posto} alt="Posto Logo" style={{ paddingTop: '5vh' }} />
      <Title as="h1">Log in</Title>
      <LoginForm />
    </Grid.Column>
  </CenterDiv>
);

export default Login;
