import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TouchableHighlight, ImageBackground, Dimensions
} from 'react-native';
import { Box, Image } from 'native-base';
import { ButtonAuthLabel, ButtonAuthLabelVariant2 } from '../../styles/shared';
import { COLORS } from '../../functions/constants';
import { generateBoxShadowStyle } from '../../functions';

function AuthButton({
  children, active, onPress, style, higlightStyle, lineHeightText, variant = 'big', text, bxShadow
}) {
  if (variant === 'big') {
    return (
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
    );
  }
  return (
    <Box
      style={{
        height: 46,
        maxWidth: 162.5,
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        position: 'relative',
        ...style,
        ...(bxShadow
            && { ...generateBoxShadowStyle(-2, -3, COLORS.purple, 1, 6, 3, COLORS.black) })
      }}
      _text={{
        color: '#8424FF'
      }}
    >
      <Image
        width="100%"
        borderRadius={12}
        height={style?.height || 46}
        source={require('../../assets/images/icons/Buttons.png')}
        resizeMode="cover"
        style={{ ...higlightStyle }}
      />
      <ButtonAuthLabelVariant2
        onPress={onPress}
      >
        {text}
      </ButtonAuthLabelVariant2>
    </Box>
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
