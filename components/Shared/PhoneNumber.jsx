import React, {useContext} from 'react';
import { MaskedTextInput } from "react-native-mask-text";
import { StyleSheet, InteractionManager } from "react-native";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {PhoneContainer, PhonePrefix} from "../../styles/authSteps";

function PhoneNumber(props) {
    const {data, handleChangeObject} = useContext(AuthContext)
    const [state, setState] = React.useState()

    React.useEffect(() => {
        if (state) {
            InteractionManager.runAfterInteractions(() => {
                state?.focus()
            })
        }
    }, [state])

    return (
        <PhoneContainer>
            <PhonePrefix>+7</PhonePrefix>
            <MaskedTextInput
                mask="999 999 99 99"
                ref={(input) => { setState(input)}}
                value={data?.phoneNumber}
                onChangeText={(text, rawText) => {
                    handleChangeObject('phoneNumber', text)
                }}
                style={styles.input}
                keyboardType="numeric"
            />
        </PhoneContainer>
    );
}

const styles = StyleSheet.create({
    input: {
        fontFamily: 'Nunito',
        width: 215,
        height: 41,
        fontWeight: "600",
        fontSize: 30,
        display: "flex",
        alignItems: 'center'
    },
});

export default PhoneNumber;
