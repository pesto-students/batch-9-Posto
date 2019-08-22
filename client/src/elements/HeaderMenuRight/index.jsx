import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const HeaderMenuRight = ({ children }) => (
  <Menu.Menu position="right">
    {children}
  </Menu.Menu>
);

HeaderMenuRight.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderMenuRight;
