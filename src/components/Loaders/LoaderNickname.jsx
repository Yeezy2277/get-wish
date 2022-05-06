import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { LoaderNicknameContainer, LoaderNicknameText } from '../../styles/loader';

function LoaderNickname({ spin, spinValue, animateState }) {

  const spinner = spinValue.interpolate({
    inputRange: [animateState.start, animateState.end],
    outputRange: ['0deg', '360deg']
  });

  React.useEffect(() => {
    (async function () {
      await spin();
    }());
  });

  return (
    <LoaderNicknameContainer>
      <Animated.Image
        style={{ transform: [{ rotate: spinner }] }}
        source={require('../../assets/images/icons/spinner.png')}
      />
      <LoaderNicknameText>Проверка никнейма...</LoaderNicknameText>
    </LoaderNicknameContainer>
  );
}

LoaderNickname.propTypes = {
  spin: PropTypes.func.isRequired
};

export default LoaderNickname;
