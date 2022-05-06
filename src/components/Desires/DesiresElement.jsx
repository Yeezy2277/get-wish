import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'native-base';

function DesiresElement({
  source, empty = false, shadow = null, avatar
}) {
  return (
    <View maxWidth="58px" height="100%" shadow={shadow}>
      <Image
        borderRadius="10px"
        height="58px"
        width="58px"
        position="relative"
        source={source || require('../../assets/images/icons/profile/desires/example1.png')}
        resizeMode="cover"
      />
      {!empty ? (
        <Image
          size="28px"
          borderRadius="14px"
          bottom="-7px"
          right="-7px"
          position="absolute"
          source={{ uri: 'https://wish.dev39.ru/media/156/conversions/media-library6XNpk6-thumb.jpg' }}
          resizeMode="cover"
        />
      ) : null}
    </View>
  );
}

DesiresElement.propTypes = {
  source: PropTypes.number,
  empty: PropTypes.bool
};

DesiresElement.defaultProps = {
  source: null,
  empty: false,
};

export default DesiresElement;
