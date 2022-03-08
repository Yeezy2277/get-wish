import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { ProfileHeader } from '../../styles/profile';

function Icon({ handlePressIcon, source, ...props }) {
  return (
    <TouchableHighlight underlayColor="none" onPress={handlePressIcon}>
      <ProfileHeader>
        <Image source={source} {...props} />
      </ProfileHeader>
    </TouchableHighlight>
  );
}

Icon.propTypes = {
  handlePressIcon: PropTypes.func,
  source: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
};

Icon.defaultProps = {
  handlePressIcon: () => null,
  source: null
};

export default Icon;
