import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import CenterContainer from '../../elements/CenterContainer';
import HeaderMenu from '../../elements/HeaderMenu';
import HeaderMenuRight from '../../elements/HeaderMenuRight';
import MenuItem from '../../elements/MenuItem';
import SearchBox from '../../elements/SearchBox';
import DropDown from '../../elements/DropDown';
import ImageElement from '../../elements/ImageElement';

import posto from '../../assets/posto.svg';
import avatar from '../../assets/avatar.png';

const Header = (props) => {
  const dropDownOptions = [
    { key: 1, text: 'Profile', value: 1 },
    { key: 2, text: 'Add Post', value: 2 },
    { key: 3, text: 'My Posts', value: 3 },
    { key: 4, text: 'Logout', value: 4 },
  ];

  const { history } = props;
  return (
    <HeaderMenu>
      <CenterContainer>
        <MenuItem>
          <ImageElement
            src={posto}
            alt="Posto Logo"
            style={{
              height: '30px',
              width: '80px',
              cursor: 'pointer',
            }}
            onClick={() => history.push('/home')}
          />
        </MenuItem>
        <HeaderMenuRight>
          <MenuItem>
            <SearchBox />
          </MenuItem>
          <MenuItem>
            <DropDown triggerImage={avatar} options={dropDownOptions} />
          </MenuItem>
        </HeaderMenuRight>
      </CenterContainer>
    </HeaderMenu>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Header);
