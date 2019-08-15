import React from 'react';
import FormInput from '../../elements/FormInput';

const EmailInput = (props) => (
  <FormInput
    id="email"
    icon="user"
    placeholder="E-mail address"
    type="email"
    label="Email"
    required
    {...props}
  />
);

export default EmailInput;
