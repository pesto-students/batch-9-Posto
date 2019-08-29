import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
  const dropDownOptions = [
    { key: 1, text: 'Profile', value: 1 },
    { key: 2, text: 'Add Post', value: 2 },
    { key: 3, text: 'My Posts', value: 3 },
    { key: 4, text: 'Logout', value: 4 },
  ];

  return (
    <HeaderMenu>
      <CenterContainer>
        <MenuItem>
          <ImageElement
            src={imageUrl}
            alt="Posto Logo"
            style={{
              height: '30px',
              width: window.innerWidth >= 650 ? '80px' : '15px',
              cursor: 'pointer',
            }}
            as={Link}
            to="/"
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

export default Header;
