import React, { useContext } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import {
  category,
} from '../../Context/constants';
import PostContext from '../../Context/PostContext';

const MenuDropDown = () => {
  const { state, dispatch } = useContext(PostContext);

  const handleDropDown = (e, { value }) => dispatch({ type: category, payload: value });

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
