import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TouchableHighlight, ImageBackground
} from 'react-native';
import { Box, Image } from 'native-base';
import { ButtonAuthLabel, ButtonAuthLabelVariant2 } from '../../styles/shared';

function AuthButton({
  children, active, onPress, style, higlightStyle, variant = 'big', text
}) {
  return (
    variant === 'big' ? (
      <View style={{ ...styles.linearGradient, ...style }}>
        <ImageBackground
          source={active ? require('../../assets/images/icons/Buttons.png') : require('../../assets/images/icons/ButtonsDisabled.png')}
          resizeMode="cover"
          style={{ ...styles.linearGradient, ...style }}
        >
          <TouchableHighlight style={{ ...styles.higlight, ...higlightStyle }} underlayColor="none" onPress={onPress}>
            <ButtonAuthLabel>{children}</ButtonAuthLabel>
          </TouchableHighlight>
        </ImageBackground>
      </View>
    ) : (
      <Box
        style={{
          height: 46, maxWidth: 162.5, display: 'flex', borderRadius: 12, flex: 1
        }}
        _text={{
          color: '#8424FF'
        }}
      >
        <Image width="100%" borderRadius={12} height={46} position="relative" source={require('../../assets/images/icons/Buttons.png')} resizeMode="cover" />
        <ButtonAuthLabelVariant2 onPress={onPress}>{text}</ButtonAuthLabelVariant2>
      </Box>
    )
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: 335,
    height: 50,
    paddingTop: 15,
    paddingBottom: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  higlight: {
    width: 335,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AuthButton.propTypes = {
  active: PropTypes.bool,
  onPress: PropTypes.func,
  variant: PropTypes.string,
  text: PropTypes.string,
};

AuthButton.defaultProps = {
  active: false,
  onPress: () => null,
  variant: 'big',
  text: null,
};

export default AuthButton;
