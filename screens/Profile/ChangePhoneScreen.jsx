import React, {useCallback} from 'react';
import {EnterCodeStep, EnterNumberStep} from "../../components";
import {useDispatch} from "react-redux";
import {AuthContext} from "../Auth/AuthScreen";

function ChangePhoneScreen(props) {
    const StepsComponents = {
        0: EnterNumberStep,
        1: EnterCodeStep,
    };

    React.useEffect(() => {
        const parent = props.navigation.getParent()
        parent.setOptions({tabBarStyle: {display: 'none'}})
        return () => {
            parent.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [])


    const dispatch = useDispatch()
    const { navigation } = props;
    const [step, setStep] = React.useState(0);
    const [data, setData] = React.useState({
        id: '',
        phoneNumber: '',
        codes: '',
        username: ''
    })

    const Step = StepsComponents[step];

    const handleChangeObject = useCallback(
        (key, value) => setData({...data, [key]: value}),
        [data]
    );

    const onNextStep = () => {
        setStep((prev) => prev + 1);
    };

    const onPrevStep = () => {
        setStep((prev) => prev - 1);
    };

    const onReloadStep = () => {
        setStep(0);
    };


    return (
        <AuthContext.Provider value={{onReloadStep, dispatch, navigation, step, onNextStep, data, handleChangeObject, onPrevStep}}>
            <Step isChangePhone={true}/>
        </AuthContext.Provider>
    );
}

export default ChangePhoneScreen;
