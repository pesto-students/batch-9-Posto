import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const HeaderMenuRight = (props) => {
  const { children } = props;
  return (
    <Menu.Menu position="right" {...props}>
      {children}
    </Menu.Menu>
  );
};

HeaderMenuRight.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderMenuRight;
