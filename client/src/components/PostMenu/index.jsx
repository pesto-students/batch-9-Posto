import React, { useContext } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

import MenuDropDown from '../../elements/MenuDropDown';
import GlobalContext from '../../context/GlobalContext';
import {
  ACTIVE_TAB,
} from '../../context/constants';

const PostMenu = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleWriteClick = () => dispatch({ type: ACTIVE_TAB, payload: 'write' });
  const handlePreviewClick = () => dispatch({ type: ACTIVE_TAB, payload: 'preview' });
  const handleHelpClick = () => dispatch({ type: ACTIVE_TAB, payload: 'help' });

  return (
    <Menu
      attached="top"
      style={{
        position: 'sticky', marginTop: '60px', zIndex: 4, top: '60px',
      }}
    >
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
