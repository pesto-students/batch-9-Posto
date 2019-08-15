import React from 'react';
import FormInput from '../../elements/FormInput';

const ContactInput = (props) => (
  <FormInput
    id="tel"
    icon="mobile alternate"
    placeholder="Phone Number (optional)"
    type="tel"
    pattern="[0-9]{10}"
    maxLength={10}
    required={false}
    title="Must be 10 numeric characters long"
    label="Phone Number"
    {...props}
  />
);

export default ContactInput;
