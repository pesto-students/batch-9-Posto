import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';

import MenuDropDown from '../../elements/MenuDropDown';

const PostMenu = ({
  activeTab, handleWriteClick, handlePreviewClick, handleHelpClick, ...props
}) => (
  <Menu attached="top">
    <Menu.Item name="Write" active={activeTab === 'write'} onClick={handleWriteClick} />
    <Menu.Item name="Preview" active={activeTab === 'preview'} onClick={handlePreviewClick} />
    <Menu.Menu position="right">
      <MenuDropDown
        {...props}
      />
      <Menu.Item active={activeTab === 'help'} onClick={handleHelpClick} position="right">
        <Icon circular inverted color="teal" name="help" />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

PostMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleWriteClick: PropTypes.func.isRequired,
  handlePreviewClick: PropTypes.func.isRequired,
  handleHelpClick: PropTypes.func.isRequired,
};

export default PostMenu;
