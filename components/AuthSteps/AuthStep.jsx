import React, {useContext} from 'react';
import {
    AuthStepContainer,
    AuthStepContent,
    AuthStepContentHeader, AuthStepContentHeaderText,
    AuthStepContentHeaderTitle, AuthStepHeader
} from "../../styles/authSteps";
import {Image, TouchableHighlight} from "react-native";
import {AuthContext} from "../../screens/Auth/AuthScreen";

function AuthStep({title, text, children, maxWidth, mt, header}) {
    const {onPrevStep} = useContext(AuthContext)
    return (
        <AuthStepContainer>
            <AuthStepContent mt={mt}>
                {header && <AuthStepHeader>
                    <TouchableHighlight underlayColor={'none'} onPress={() => onPrevStep()}>
                        <Image source={require('../../assets/images/icons/arrow.png')}/>
                    </TouchableHighlight>
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
