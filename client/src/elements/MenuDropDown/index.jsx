import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'semantic-ui-react';

const MenuDropDown = ({
  value, handleDropDown, options, placeholder,
}) => (
  <Menu>
    <Dropdown
      item
      selection
      onChange={handleDropDown}
      placeholder={placeholder}
      options={options}
      value={value}
      scrolling
    />
  </Menu>
);

MenuDropDown.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  handleDropDown: PropTypes.func.isRequired,
};

export default MenuDropDown;
