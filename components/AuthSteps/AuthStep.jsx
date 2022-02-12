import React, {useContext} from 'react';
import {
    AuthStepContainer,
    AuthStepContent,
    AuthStepContentHeader, AuthStepContentHeaderText,
    AuthStepContentHeaderTitle, AuthStepHeader, ExitImage, HeaderTouchableHighlight
} from "../../styles/authSteps";
import {Image, TouchableHighlight} from "react-native";
import {AuthContext} from "../../screens/Auth/AuthScreen";

function AuthStep({title, text, children, maxWidth, mt, back, exit}) {
    const {onPrevStep} = useContext(AuthContext)
    return (
        <AuthStepContainer>
            <AuthStepContent mt={mt}>
                {back && <AuthStepHeader jc={"flex-start"}>
                    <TouchableHighlight underlayColor={'none'} onPress={() => onPrevStep()}>
                        <Image source={require('../../assets/images/icons/arrow.png')}/>
                    </TouchableHighlight>
                </AuthStepHeader>}
                {exit && <AuthStepHeader jc={"flex-end"}>
                    <HeaderTouchableHighlight underlayColor={'none'} >
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
