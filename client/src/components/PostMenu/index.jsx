import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';

import MenuDropDown from '../../elements/MenuDropDown';
import GlobalContext from '../../context/GlobalContext';
import {
  ACTIVE_TAB,
} from '../../context/constants';
import styles from './PostMenu.module.css';

const PostMenu = ({ newPost }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWriteClick = () => dispatch({ type: ACTIVE_TAB, payload: 'write' });
  const handlePreviewClick = () => dispatch({ type: ACTIVE_TAB, payload: 'preview' });
  const handleHelpClick = () => dispatch({ type: ACTIVE_TAB, payload: 'help' });

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <Menu
      attached="top"
      style={{
        position: 'sticky', marginTop: '60px', zIndex: 4, top: '60px',
      }}
    >
      <Menu.Item className={styles.item} name="Write" active={state.activeTab === 'write'} onClick={handleWriteClick}>
        {
          windowWidth <= 650
            ? <Icon circular inverted color="teal" name="write square" />
            : null
        }
      </Menu.Item>
      <Menu.Item className={styles.item} name="Preview" active={state.activeTab === 'preview'} onClick={handlePreviewClick}>
        {
          windowWidth <= 650
            ? <Icon circular inverted color="teal" name="file text" />
            : null
        }
      </Menu.Item>
      <Menu.Menu position="right">
        <MenuDropDown newPost={newPost} />
        <Menu.Item className={styles.item} active={state.activeTab === 'help'} onClick={handleHelpClick} position="right">
          <Icon circular inverted color="teal" name="help" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

PostMenu.propTypes = {
  newPost: PropTypes.bool,
};

PostMenu.defaultProps = {
  newPost: false,
};

export default PostMenu;
