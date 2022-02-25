import React, {useContext} from 'react';
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

function AuthStep({title, text, children, maxWidth, mt, back, exit, isChangePhone, isFirstStep}) {
    const {onPrevStep, dispatch, onReloadStep} = useContext(AuthContext)

    const handleLogout = async () => {
        await dispatch(logout())
        onReloadStep()
    }

    return (
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
    );
}

export default AuthStep;
