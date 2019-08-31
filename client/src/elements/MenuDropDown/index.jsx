import React, { useContext } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import {
  CATEGORY,
} from '../../context/constants';
import GlobalContext from '../../context/GlobalContext';
import styles from './MenuDropDown.module.css';

const MenuDropDown = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleDropDown = (e, { value }) => dispatch({ type: CATEGORY, payload: value });

  return (
    <Menu.Item className={styles.item}>
      <Dropdown
        selection
        scrolling
        onChange={handleDropDown}
        placeholder="Select category"
        options={state.categoryOptions}
        value={state.category}
      />
    </Menu.Item>
  );
};

export default MenuDropDown;
