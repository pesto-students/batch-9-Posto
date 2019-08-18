import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../elements/FormInput';

const TextInput = ({ name, ...props }) => (
  <FormInput
    required
    icon="user"
    placeholder="Name"
    type="text"
    label={name}
    id={name}
    {...props}
  />
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextInput;
