import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const MenuItem = (props) => {
  const { children } = props;
  return (
    <Menu.Item {...props}>
      {children}
    </Menu.Item>
  );
};

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuItem;
