import React from 'react';
import { Form, Input } from 'semantic-ui-react';

import styles from './FormInput.module.css';

const FormInput = (props) => (
  <Form.Field
    fluid
    className={styles.label}
    iconPosition="left"
    control={Input}
    {...props}
  />
);

export default FormInput;
