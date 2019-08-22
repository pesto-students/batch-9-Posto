import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Image } from 'semantic-ui-react';

const DropDown = (props) => {
  const { triggerImage, options } = props;
  const trigger = (
    <span>
      <Image src={triggerImage} style={{ height: '35px', width: '35px' }} />
    </span>
  );

  return (
    <Dropdown trigger={trigger} options={options} pointing="top right" icon={null} />
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
