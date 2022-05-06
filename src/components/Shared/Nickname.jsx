import React from 'react';
import { Animated } from 'react-native';
import Easing from 'react-native-web/dist/vendor/react-native/Animated/Easing';
import { NicknameError, NicknameInput, NicknameSuccess } from '../../styles/shared';
import { LoaderNickname } from '../index';
import { delay } from '../../functions';
import { checkAvailability } from '../../redux/actions/authActions';
import {useI18n} from "../../i18n/i18n";

function Nickname(props) {
  const {
    field: { name, onChange, value },
    form: {
      errors, touched, submitForm, isSubmitting, setErrors
    },
    setCanRegistration,
    availability, setAvailability, setState
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

  const t = useI18n()

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
      if (!availabilityLoading) { setCanRegistration(false); }
      setLoading(false);
      setPreLoading(false);
      submitForm();
      clearTimeout(timeout);
    }, 1500);
  };

  const animationError = async () => {
    setErrors({ nickName: t('auth_errorNicknameFormat') });
    setErrorAnimation(true);
    timeoutAnimation = setTimeout(async () => {
      setErrorAnimation(false);
      clearTimeout(timeoutAnimation);
    }, 100);
  };

  const handleChangeTextInput = async (text) => {
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

  };

  return (
    <>
      <NicknameInput
        ref={(input) => { setState(input); }}
        errorAnimation={errorAnimation && 15}
        value={value}
        onChangeText={handleChangeTextInput}
        autoCapitalize="none"
        style={{ textTransform: 'lowercase' }}
        autoCorrect={false}
      />
      {!hasError && availability && isSubmitting && !preLoading && !loading
      && <NicknameSuccess>{t('auth_nicknameAvailable')}</NicknameSuccess>}
      {!hasError && !availability && isSubmitting && !preLoading && !loading
      && <NicknameError>{t('auth_nicknameNotAvailable')}</NicknameError>}
      {hasError && !preLoading && !loading && <NicknameError>{errors[name]}</NicknameError>}
      {loading
      && (
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

export default Nickname;
