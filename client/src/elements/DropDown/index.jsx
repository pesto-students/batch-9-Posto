import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Image } from 'semantic-ui-react';

import GlobalContext from '../../context/GlobalContext';
import { LOGOUT } from '../../context/constants';

const DropDown = ({ triggerImage, options }) => {
  const [dropdownValue, setDropdownValue] = useState(null);
  const { dispatch } = useContext(GlobalContext);

  const trigger = (
    <span>
      <Image circular src={triggerImage} style={{ height: '35px', width: '35px' }} />
    </span>
  );
  const handleChange = (e, { value }) => {
    if (value === 4) {
      localStorage.clear();
      dispatch({ type: LOGOUT });
    }
    setDropdownValue(value);
  };

  return (
    <Dropdown onChange={handleChange} value={dropdownValue} trigger={trigger} options={options} pointing="top right" icon={null} />
  );
};

DropDown.propTypes = {
  triggerImage: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

export default DropDown;
