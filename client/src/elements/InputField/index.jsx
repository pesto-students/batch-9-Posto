import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const InputField = ({
  icon, iconPosition, placeholder, type,
}) => (
  <Form.Input
    fluid
    icon={icon}
    iconPosition={iconPosition}
    placeholder={placeholder}
    type={type}
    required
  />
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  icon: undefined,
  iconPosition: 'left',
  placeholder: '',
};

export default InputField;
