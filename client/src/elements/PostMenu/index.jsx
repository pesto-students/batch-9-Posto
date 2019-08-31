import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const PostMenu = ({ children }) => (
  <Menu
    pointing
    secondary
    style={{
      position: 'fixed',
      top: '40px',
      width: '100%',
      zIndex: '2',
      paddingTop: '9px',
      margin: 0,
      marginTop: '20px',
      background: 'white',
    }}
  >
    {children}
  </Menu>
);

PostMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostMenu;
