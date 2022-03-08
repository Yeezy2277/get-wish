import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  AuthStepCancelText,
  AuthStepContainer,
  AuthStepContent,
  AuthStepContentHeader, AuthStepContentHeaderText,
  AuthStepContentHeaderTitle, AuthStepHeader, ExitImage, HeaderTouchableHighlight
} from '../../styles/authSteps';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import { logout } from '../../redux/actions/authActions';
import { navigateAction } from '../../functions/NavigationService';
import { COLORS } from '../../functions/constants';

function AuthStep({
  title, text, children, maxWidth, mt, back, exit, isChangePhone, isFirstStep
}) {
  const { onPrevStep, dispatch, onReloadStep } = useContext(AuthContext);

  const handleLogout = async () => {
    await dispatch(logout());
    onReloadStep();
  };

  const goToMain = () => {
    navigateAction('MainProfile');
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={{ backgroundColor: COLORS.white }}
      scrollEnabled={false}
    >
      <AuthStepContainer>
        <AuthStepContent mt={mt}>
          {back && (
          <AuthStepHeader jc="flex-start">
            <TouchableHighlight underlayColor="none" onPress={onPrevStep}>
              <Image style={{ width: 9, height: 16 }} source={require('../../assets/images/icons/arrow.png')} />
            </TouchableHighlight>
          </AuthStepHeader>
          )}
          {isChangePhone && isFirstStep && (
          <AuthStepHeader mb={58} jc="flex-start">
            <TouchableHighlight underlayColor="none" onPress={goToMain}>
              <AuthStepCancelText>Отмена</AuthStepCancelText>
            </TouchableHighlight>
          </AuthStepHeader>
          )}
          {exit && (
          <AuthStepHeader jc="flex-end">
            <HeaderTouchableHighlight onPress={handleLogout} underlayColor="none">
              <ExitImage source={require('../../assets/images/icons/header/exit.png')} />
            </HeaderTouchableHighlight>
          </AuthStepHeader>
          )}
          <AuthStepContentHeader mw={maxWidth}>
            <AuthStepContentHeaderTitle>{title}</AuthStepContentHeaderTitle>
            <AuthStepContentHeaderText>{text}</AuthStepContentHeaderText>
          </AuthStepContentHeader>
          {children}
        </AuthStepContent>
      </AuthStepContainer>
    </KeyboardAwareScrollView>
  );
}

AuthStep.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  maxWidth: PropTypes.number,
  mt: PropTypes.number,
  back: PropTypes.bool,
  exit: PropTypes.bool,
  isChangePhone: PropTypes.bool,
  isFirstStep: PropTypes.bool,
};

export default AuthStep;
