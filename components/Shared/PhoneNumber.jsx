import React, {useContext} from 'react';
import { MaskedTextInput } from "react-native-mask-text";
import {StyleSheet, InteractionManager, Platform} from "react-native";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {PhoneContainer, PhonePrefix} from "../../styles/authSteps";

function PhoneNumber() {
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
            <PhonePrefix fz={Platform.OS === 'android' ? 27 : 30}>+7</PhonePrefix>
            <MaskedTextInput
                mask="999 999 99 99"
                ref={(input) => { setState(input)}}
                value={data?.phoneNumber}
                onChangeText={(text) => {
                    handleChangeObject('phoneNumber', text)
                }}
                style={styles.input}
                keyboardType="numeric"
                autoFocus={true}
            />
        </PhoneContainer>
    );
}

const styles = StyleSheet.create({
    input: {
        fontFamily: 'Nunito',
        minWidth: 204,
        fontStyle: 'normal',
        height: 41,
        color: '#1A1A1A',
        fontWeight: "600",
        fontSize: Platform.OS === 'android' ? 27 : 30,
        display: "flex",
        alignItems: 'center'
    },
});

export default PhoneNumber;
