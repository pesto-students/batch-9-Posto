import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'semantic-ui-react';
import {
  CATEGORY, NEW_POST_CATEGORY,
} from '../../context/constants';
import GlobalContext from '../../context/GlobalContext';
import styles from './MenuDropDown.module.css';

const MenuDropDown = ({ newPost }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleDropDown = (e, { value }) => dispatch({ type: CATEGORY, payload: value });
  const handleCategoryChange = (e, { value }) => {
    dispatch({ type: CATEGORY, payload: value });
    dispatch({ type: NEW_POST_CATEGORY, payload: value });
  };

  return (
    <Menu.Item className={styles.item}>
      <Dropdown
        selection
        scrolling
        onChange={newPost ? handleCategoryChange : handleDropDown}
        placeholder="Select category"
        options={state.categoryOptions}
        value={newPost ? state.newPostCategory : state.category}
      />
    </Menu.Item>
  );
};

MenuDropDown.propTypes = {
  newPost: PropTypes.bool,
};

MenuDropDown.defaultProps = {
  newPost: false,
};

export default MenuDropDown;
