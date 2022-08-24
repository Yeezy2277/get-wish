// eslint-disable-next-line no-promise-executor-return
import { Platform } from 'react-native';

export const delay = (ms) => new Promise((res) => setTimeout(() => res(), ms));

export const androidShadow = {
  shadowOffset: { width: 10, height: 10 },
  shadowColor: 'black',
  shadowOpacity: 1,
  elevation: 3,
};

export const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } if (Platform.OS === 'android') {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
  return {};
};

export const CheckSpaces = (str, comment) => {
  return str.trim() === '' && !comment.length
};
