import React, {useCallback} from 'react';
import {EnterCodeStep, EnterNumberStep} from "../../components";

const stepsComponents = {
    0: EnterNumberStep,
    1: EnterCodeStep,
};


export const AuthContext = React.createContext(undefined)

function AuthScreen(props) {
    const { navigation } = props;
    const [step, setStep] = React.useState(0);
    const [data, setData] = React.useState({
        phoneNumber: ''
    })
    const Step = stepsComponents[step];

    const handleChangeObject = useCallback(
        (key, value) => setData({...data, [key]: value}),
        [data]
    );

    const onNextStep = () => {
        setStep((prev) => prev + 1);
    };

    return (
        <AuthContext.Provider value={{step, onNextStep, data, handleChangeObject}}>
            <Step/>
        </AuthContext.Provider>
    );
}

export default AuthScreen;
