import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';

import GlobalContext from '../../context/GlobalContext';
import { LOGOUT } from '../../context/constants';

const DropDown = ({ triggerImage, history }) => {
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

  const handleProfile = () => {
    if (history.location.pathname === '/profile') {
      history.replace('/profile');
    } else {
      history.push('/profile');
    }
  };

  const handleNew = () => {
    if (history.location.pathname === '/new') {
      history.replace('/new');
    } else {
      history.push('/new');
    }
  };

  const handleMyPosts = () => {
    if (history.location.pathname === '/my-posts') {
      history.replace('/my-posts');
    } else {
      history.push('/my-posts');
    }
  };

  return (
    <Dropdown trigger={trigger} pointing="top right" icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item text="Profile" onClick={handleProfile} />
        <Dropdown.Item text="Add Post" onClick={handleNew} />
        <Dropdown.Item text="My Posts" onClick={handleMyPosts} />
        <Dropdown.Divider />
        <Dropdown.Item text="Logout" onClick={handleLogout} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropDown.propTypes = {
  triggerImage: PropTypes.string.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(DropDown);
