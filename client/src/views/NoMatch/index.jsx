import React from 'react';
import { Grid } from 'semantic-ui-react';

import CenterDiv from '../../components/CenterDiv';
import Title from '../../components/Title';
import posto from '../../assets/posto.svg';
import styles from './NoMatch.module.css';

const NoMatch = () => (
  <CenterDiv>
    <Grid.Column style={{ maxWidth: 450 }}>
      <img src={posto} alt="Posto Logo" style={{ paddingTop: '5vh' }} />
      <Title color="red" as="h1" className={styles.msgH1}>404</Title>
      <Title color="black" as="h2" className={styles.msgH2}>This is not the web page you are looking for.</Title>
    </Grid.Column>
  </CenterDiv>
);

export default NoMatch;
