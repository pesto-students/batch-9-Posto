import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../elements/FormInput';

const PasswordInput = ({ verify, userPassword, ...props }) => {
  let title = 'Minimum 8 characters. At least one uppercase letter, one lowercase letter, one number and one special character';
  let label = 'Password';
  let id = 'password';
  let pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$';

  if (verify) {
    title = 'Must match the password';
    label = 'Confirm Password';
    id = 'verify-password';
    pattern = userPassword;
  }

  return (
    <FormInput
      id={id}
      icon="lock"
      placeholder="Password"
      type="password"
      pattern={pattern}
      title={title}
      label={label}
      required
      {...props}
    />
  );
};


PasswordInput.propTypes = {
  verify: PropTypes.bool,
  userPassword: PropTypes.string,
};

PasswordInput.defaultProps = {
  verify: false,
  userPassword: undefined,
};


export default PasswordInput;
