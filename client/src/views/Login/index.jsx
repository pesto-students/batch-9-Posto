import React from 'react';
import { Grid } from 'semantic-ui-react';

import CenterDiv from '../../components/CenterDiv';
import LoginForm from '../../components/LoginForm';
import Title from '../../components/Title';

const Login = () => (
  <CenterDiv>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Title as="h1">Posto</Title>
      <Title as="h2">Log-in</Title>
      <LoginForm />
    </Grid.Column>
  </CenterDiv>
);

export default Login;
