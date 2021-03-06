import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CenterContainer from '../../elements/CenterContainer';
import HeaderMenu from '../../elements/HeaderMenu';
import HeaderMenuRight from '../../elements/HeaderMenuRight';
import MenuItem from '../../elements/MenuItem';
import SearchBox from '../../elements/SearchBox';
import DropDown from '../../elements/DropDown';
import ImageElement from '../../elements/ImageElement';

import postoSm from '../../assets/postoSm.svg';
import posto from '../../assets/posto.svg';
import avatar from '../../assets/avatar.png';
import GlobalContext from '../../context/GlobalContext';

const Header = ({ disabledSearchBox }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { state } = useContext(GlobalContext);
  const imageUrl = windowWidth >= 650 ? posto : postoSm;

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
    <HeaderMenu>
      <CenterContainer>
        <MenuItem>
          <ImageElement
            src={imageUrl}
            alt="Posto Logo"
            style={{
              height: '30px',
              width: window.innerWidth >= 650 ? '80px' : '26px',
              cursor: 'pointer',
            }}
            as={Link}
            to="/"
          />
        </MenuItem>
        <HeaderMenuRight>
          <MenuItem>
            <SearchBox disabledSearchBox={disabledSearchBox} />
          </MenuItem>
          <MenuItem>
            <DropDown triggerImage={state.user.profilePic || avatar} />
          </MenuItem>
        </HeaderMenuRight>
      </CenterContainer>
    </HeaderMenu>
  );
};

Header.defaultProps = {
  disabledSearchBox: false,
};

Header.propTypes = {
  disabledSearchBox: PropTypes.bool,
};

export default Header;
