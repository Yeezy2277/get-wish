import React, {useContext} from 'react';
import { MaskedTextInput } from "react-native-mask-text";
import { StyleSheet, InteractionManager } from "react-native";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {PhoneContainer, PhonePrefix} from "../../styles/authSteps";

function PhoneNumber(props) {
    const {data, handleChangeObject} = useContext(AuthContext)
    const [state, setState] = React.useState({})

    React.useEffect(() => {
        if (Object.keys(state).length !== 0) {
            InteractionManager.runAfterInteractions(() => {
                state.focus()
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
                onChangeText={(text) => {
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
        fontStyle: 'normal',
        height: 41,
        lineHeight: 41,
        color: '#1A1A1A',
        fontWeight: "600",
        fontSize: 30,
        display: "flex",
        alignItems: 'center'
    },
});

export default PhoneNumber;
