import React from 'react';
import AuthStep from "./AuthStep";
import AuthButton from "../Shared/AuthButton";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {
    CodeElement,
    CodePlaceholder,
    Codes,
    CodeTextError,
    EnterCodeStepBottom,
    EnterCodeStepContainer
} from "../../styles/authSteps";
import {StyleSheet, TextInput, InteractionManager} from "react-native";
import EnterCodeStepTimer from "./EnterCodeStepTimer";
import {checkCode} from "../../redux/actions/authActions";

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
                index === 0 ? state1?.focus() : index === 1 ? state2?.focus() :
                    state3?.focus()
            } else {
                handleChangeObject('codes', [...codes, text].join(''))
            }
        }
    };

    const [error, setError] = React.useState(false)
    const [state, setState] = React.useState({})
    const [state1, setState1] = React.useState({})
    const [state2, setState2] = React.useState({})
    const [state3, setState3] = React.useState({})

    React.useEffect(() => {
        if (Object.keys(state).length !== 0) {
            InteractionManager.runAfterInteractions(() => {
                state.focus()
            })
        }
    }, [state])

    const handleKeyPress = (keyValue, index) => {
        if (keyValue === 'Backspace' && index !== 0 && !codes[index]) {
            let idx = index - 1
            index === 3 ? state2?.focus() : index === 2 ? state1?.focus() :
                state?.focus()
            let newCodes = [...codes]
            newCodes[idx] = ''
            setCodes(newCodes)
        }
    }

    const onPressCodeStep = async () => {
        const phoneNumber = data.phoneNumber.split(' ').join('')
        if (!disabledNext) {
            await checkCode(`+7${phoneNumber}`, codes.join('')).then(async () => {
                onNextStep()
            }).catch(() => {
                setCodes(['', '', '', ''])
                state?.focus()
                setError(true)
            })
        }
    }

    let disabledNext = true

    codes.forEach(el => {
        disabledNext = !el;
    })


    return (
        <AuthStep back={true} mt={44} maxWidth={276} text="На этот номер был отправлен код подтверждения. Введи его в поле ниже." title={`+7 ${data.phoneNumber}`}>
            <EnterCodeStepContainer>
                <Codes>
                    {codes.map((code, index) => (
                        <CodeElement key={index}>
                            {!codes[index] && <CodePlaceholder error={error && '#FFDEDE'}/>}
                            <TextInput
                                ref={(input) => { index === 0 ? setState(input) : index === 1 ? setState1(input) :
                                    index === 2 ? setState2(input) : setState3(input)}}
                                textContentType="telephoneNumber"
                                maxLength={1}
                                onKeyPress={({ nativeEvent: { key: keyValue } })  => handleKeyPress(keyValue, index)}
                                onChangeText={text => handleChangeInput(text, index)}
                                id={String(index)}
                                keyboardType="numeric"
                                style={styles.inputStyle}
                                value={code}
                            />
                        </CodeElement>
                    ))}
                </Codes>
                {error && <CodeTextError>Введён неверный код</CodeTextError>}
                <EnterCodeStepBottom>
                    <EnterCodeStepTimer/>
                    <AuthButton onPress={onPressCodeStep} colors={disabledNext ? ['#D4DAEC', '#D4DAEC'] : ['#FB26FF', '#8A24FF', '#8424FF']}>Подтвердить</AuthButton>
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
        paddingLeft: 5,
        fontSize: 31,
        // ...(Platform.OS === 'android' && { textAlignVertical: 'bottom' })
    }
})


export default EnterCodeStep;
