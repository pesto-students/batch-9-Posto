import React, { useContext } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

import MenuDropDown from '../../elements/MenuDropDown';
import PostContext from '../../Context/PostContext';
import {
  activeTab,
} from '../../Context/constants';

const PostMenu = () => {
  const { state, dispatch } = useContext(PostContext);

  const handleWriteClick = () => dispatch({ type: activeTab, payload: 'write' });
  const handlePreviewClick = () => dispatch({ type: activeTab, payload: 'preview' });
  const handleHelpClick = () => dispatch({ type: activeTab, payload: 'help' });

  return (
    <Menu attached="top">
      <Menu.Item name="Write" active={state.activeTab === 'write'} onClick={handleWriteClick} />
      <Menu.Item name="Preview" active={state.activeTab === 'preview'} onClick={handlePreviewClick} />
      <Menu.Menu position="right">
        <MenuDropDown />
        <Menu.Item active={state.activeTab === 'help'} onClick={handleHelpClick} position="right">
          <Icon circular inverted color="teal" name="help" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default PostMenu;
