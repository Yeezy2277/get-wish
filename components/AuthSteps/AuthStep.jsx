import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {
    AuthStepCancelText,
    AuthStepContainer,
    AuthStepContent,
    AuthStepContentHeader, AuthStepContentHeaderText,
    AuthStepContentHeaderTitle, AuthStepHeader, ExitImage, HeaderTouchableHighlight
} from "../../styles/authSteps";
import {Image, TouchableHighlight} from "react-native";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {logout} from "../../redux/actions/authActions";
import {navigateAction} from "../../functions/NavigationService";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function AuthStep({title, text, children, maxWidth, mt, back, exit, isChangePhone, isFirstStep}) {
    const {onPrevStep, dispatch, onReloadStep} = useContext(AuthContext)

    const handleLogout = async () => {
        await dispatch(logout())
        onReloadStep()
    }

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            style={{ backgroundColor: '#fff' }}
            scrollEnabled={false}
        >
        <AuthStepContainer>
            <AuthStepContent mt={mt}>
                {back && <AuthStepHeader jc={"flex-start"}>
                    <TouchableHighlight underlayColor={'none'} onPress={() => onPrevStep()}>
                        <Image style={{width: 9, height: 16}} source={require('../../assets/images/icons/arrow.png')}/>
                    </TouchableHighlight>
                </AuthStepHeader>}
                {isChangePhone && isFirstStep && <AuthStepHeader mb={58} jc={"flex-start"}>
                    <TouchableHighlight underlayColor={'none'} onPress={() => navigateAction('MainProfile')}>
                        <AuthStepCancelText>Отмена</AuthStepCancelText>
                    </TouchableHighlight>
                </AuthStepHeader>}
                {exit && <AuthStepHeader jc={"flex-end"}>
                    <HeaderTouchableHighlight onPress={handleLogout} underlayColor={'none'} >
                        <ExitImage source={require('../../assets/images/icons/header/exit.png')}/>
                    </HeaderTouchableHighlight>
                </AuthStepHeader>}
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
    title: PropTypes.string,
    text: PropTypes.string,
    maxWidth: PropTypes.number,
    mt: PropTypes.number,
    back: PropTypes.bool,
    exit: PropTypes.bool,
    isChangePhone: PropTypes.bool,
    isFirstStep: PropTypes.bool,
};

export default AuthStep;
