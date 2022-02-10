import React from 'react';
import {
    AuthStepContainer,
    AuthStepContent,
    AuthStepContentHeader, AuthStepContentHeaderText,
    AuthStepContentHeaderTitle, AuthStepHeader
} from "../../styles/authSteps";
import {Image} from "react-native";

function AuthStep({title, text, children, maxWidth, mt, header}) {
    return (
        <AuthStepContainer>
            <AuthStepContent mt={mt}>
                {header && <AuthStepHeader>
                    <Image source={require('../../assets/images/icons/arrow.png')}/>
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
