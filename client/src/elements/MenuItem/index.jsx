import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const HeaderMenuRight = (props) => {
  const { children } = props;
  return (
    <Menu.Item {...props}>
      {children}
    </Menu.Item>
  );
};

HeaderMenuRight.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderMenuRight;
