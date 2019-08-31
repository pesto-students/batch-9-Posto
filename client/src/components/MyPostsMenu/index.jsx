import React from 'react';
import PropTypes from 'prop-types';

import PostMenu from '../../elements/PostMenu';
import MenuItem from '../../elements/MenuItem';
import CenterContainer from '../../elements/CenterContainer';

const MyPostsMenu = ({ activeItem, onClick }) => (
  <PostMenu>
    <CenterContainer>
      <MenuItem active={activeItem === 'drafts'} onClick={() => onClick('drafts')}>
        Drafts
      </MenuItem>
      <MenuItem active={activeItem === 'published'} onClick={() => onClick('published')}>
        Published
      </MenuItem>
      <MenuItem active={activeItem === 'private'} onClick={() => onClick('private')}>
        Private
      </MenuItem>
    </CenterContainer>
  </PostMenu>
);

MyPostsMenu.propTypes = {
  activeItem: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MyPostsMenu;
