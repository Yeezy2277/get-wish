import React from 'react';
import { Animated } from 'react-native';
import Easing from 'react-native-web/dist/vendor/react-native/Animated/Easing';
import {
  NicknameError, NicknameSuccess, TextFieldTwoInput
} from '../../styles/shared';
import { LoaderNickname } from '../index';
import { delay } from '../../functions';
import { checkAvailability } from '../../redux/actions/authActions';

function TextFieldTwo(props) {
  const {
    field: { name, onChange, value },
    form: {
      errors, touched, submitForm, isSubmitting, setErrors
    },
    setCanRegistration,
    availability, setAvailability
  } = props;
  let timeout;
  let timeoutAnimation;
  const hasError = errors[name] && touched[name];
  const [loading, setLoading] = React.useState(false);
  const [preLoading, setPreLoading] = React.useState(false);
  const [errorAnimation, setErrorAnimation] = React.useState(false);

  const animateState = {
    start: 0,
    end: 100
  };

  const spinValue = new Animated.Value(0);

  const spin = async () => {
    await Animated.timing(
      spinValue,
      {
        toValue: animateState.end,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(async () => {
      await spin();
    });
  };

  const showLoading = async (text) => {
    setPreLoading(true);
    await delay(1200);
    setLoading(true);
    timeout = setTimeout(async () => {
      const availabilityLoading = await checkAvailability(text);
      setAvailability(availabilityLoading);
      if (!availabilityLoading) {
        setCanRegistration(false);
      }
      setLoading(false);
      setPreLoading(false);
      submitForm();
      clearTimeout(timeout);
    }, 1500);
  };

  const animationError = async () => {
    setErrors({ nickName: 'Допустимые символы: a-z, 0-9, . и _' });
    setErrorAnimation(true);
    timeoutAnimation = setTimeout(async () => {
      setErrorAnimation(false);
      clearTimeout(timeoutAnimation);
    }, 100);
  };

  return (
    <>
      <TextFieldTwoInput
        errorAnimation={errorAnimation && 90}
        value={value}
        onChangeText={async (text) => {
          if (text.length !== 0) {
            if (text.match(/^(?=.*[a-z_.])[\w.]+$/)) {
              await onChange(name)(text);
              if (loading) {
                setLoading(false);
              } else if (text.length >= 3) {
                await showLoading(text);
              }
            } else {
              await animationError();
            }
          } else {
            await onChange(name)(text);
            if (loading) {
              setLoading(false);
            } else if (text.length >= 3) {
              await showLoading(text);
            }
          }
        }}
        autoCapitalize="none"
      />
      {!hasError && availability && isSubmitting && !preLoading && !loading
      && <NicknameSuccess>Никнейм свободен</NicknameSuccess>}
      {!hasError && !availability && isSubmitting
      && !preLoading && !loading && (
      <NicknameError>
        К сожалению, этот никнейм уже занят
      </NicknameError>
      )}
      {hasError && !preLoading && !loading && <NicknameError>{errors[name]}</NicknameError>}
      {loading && (
      <LoaderNickname
        loading={loading}
        animateState={animateState}
        spin={spin}
        spinValue={spinValue}
      />
      )}
    </>
  );
}

export default TextFieldTwo;
