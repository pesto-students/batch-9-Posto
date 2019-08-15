import React from 'react';
import { Form, Input } from 'semantic-ui-react';

import styles from './FormInput.module.css';

const FormInput = (props) => (
  <Form.Field
    className={styles.label}
    fluid
    iconPosition="left"
    control={Input}
    {...props}
  />
);

export default FormInput;
