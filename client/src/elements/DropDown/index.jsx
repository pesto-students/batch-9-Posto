import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';

import GlobalContext from '../../context/GlobalContext';
import { LOGOUT } from '../../context/constants';

const DropDown = ({ triggerImage }) => {
  const { dispatch } = useContext(GlobalContext);

  const trigger = (
    <span>
      <Image circular src={triggerImage} style={{ height: '35px', width: '35px' }} alt="user avatar" />
    </span>
  );

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
  };

  return (
    <Dropdown trigger={trigger} pointing="top right" icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item text="Profile" as={Link} to="/profile" />
        <Dropdown.Item text="Add Post" as={Link} to="/new" />
        <Dropdown.Item text="My Posts" as={Link} to="/my-posts" />
        <Dropdown.Divider />
        <Dropdown.Item text="Logout" onClick={handleLogout} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropDown.propTypes = {
  triggerImage: PropTypes.string.isRequired,
};

export default DropDown;
