import React from 'react';
import FormInput from '../../elements/FormInput';

const EmailInput = (props) => (
  <FormInput
    required
    id="email"
    icon="mail"
    placeholder="E-mail address"
    type="email"
    label="Email"
    {...props}
  />
);

export default EmailInput;
