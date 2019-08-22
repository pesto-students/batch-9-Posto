import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const HeaderMenu = ({ children }) => (
  <Menu
    borderless
    style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '60px',
      border: 'none',
      borderBottom: '1px solid black',
      borderRadius: 0,
    }}
  >
    {children}
  </Menu>
);

HeaderMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderMenu;
