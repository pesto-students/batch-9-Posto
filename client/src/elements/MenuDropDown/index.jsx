import React, { useContext } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import {
  CATEGORY,
} from '../../context/constants';
import GlobalContext from '../../context/GlobalContext';

const MenuDropDown = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleDropDown = (e, { value }) => dispatch({ type: CATEGORY, payload: value });

  return (
    <Menu>
      <Dropdown
        item
        selection
        onChange={handleDropDown}
        placeholder="Select post category"
        options={state.categoryOptions}
        value={state.category}
        scrolling
      />
    </Menu>
  );
};

export default MenuDropDown;
