import React from 'react';
import AuthStep from "./AuthStep";
import AuthButton from "../Shared/AuthButton";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {CodeElement, CodePlaceholder, Codes, EnterCodeStepBottom, EnterCodeStepContainer} from "../../styles/authSteps";
import {StyleSheet, TextInput, InteractionManager} from "react-native";
import EnterCodeStepTimer from "./EnterCodeStepTimer";

function EnterCodeStep() {
    const {data, handleChangeObject, onNextStep} = React.useContext(AuthContext)

    const [codes, setCodes] = React.useState(['', '', '', ''])
    const handleChangeInput = (text, index) => {
        setCodes((prev) => {
            const newArr = [...prev];
            newArr[index] = text;
            return newArr;
        });
        if (text) {
            let idx = index + 1
            if (codes[idx] !== undefined) {
                index === 0 ? state1.focus() : index === 1 ? state2.focus() :
                    state3.focus()
            } else {
                handleChangeObject('codes', [...codes, text].join(''))
            }
        }
    };


    const [state, setState] = React.useState()
    const [state1, setState1] = React.useState()
    const [state2, setState2] = React.useState()
    const [state3, setState3] = React.useState()

    React.useEffect(() => {
        if (state) {
            InteractionManager.runAfterInteractions(() => {
                state?.focus()
            })
        }
    }, [state])

    return (
        <AuthStep back={true} mt={44} maxWidth={276} text="На этот номер был отправлен код подтверждения. Введи его в поле ниже." title={`+7 ${data.phoneNumber}`}>
            <EnterCodeStepContainer>
                <Codes>
                    {codes.map((code, index) => (
                        <CodeElement key={index}>
                            {!codes[index] && <CodePlaceholder/>}
                            <TextInput
                                ref={(input) => { index === 0 ? setState(input) : index === 1 ? setState1(input) :
                                    index === 2 ? setState2(input) : setState3(input)}}
                                textContentType="telephoneNumber"
                                maxLength={1}
                                onChangeText={text => handleChangeInput(text, index)}
                                id={String(index)}
                                keyboardType="numeric"
                                style={styles.inputStyle}
                                value={code}
                            />
                        </CodeElement>
                    ))}
                </Codes>
                <EnterCodeStepBottom>
                    <EnterCodeStepTimer/>
                    <AuthButton onPress={() => {
                        if (data.codes.length) {
                            onNextStep()
                        }
                    }} colors={data.codes.length ? ['#FB26FF', '#8A24FF', '#8424FF'] : ['#D4DAEC', '#D4DAEC']}>Подтвердить</AuthButton>
                </EnterCodeStepBottom>
            </EnterCodeStepContainer>
        </AuthStep>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        color: '#1A1A1A',
        fontSize: 31,
        lineHeight: 41
    }
})


export default EnterCodeStep;
