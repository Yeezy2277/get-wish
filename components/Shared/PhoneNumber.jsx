import React, {useContext} from 'react';
import { MaskedTextInput } from "react-native-mask-text";
import { StyleSheet } from "react-native";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {PhoneContainer, PhonePrefix} from "../../styles/authSteps";

function PhoneNumber(props) {
    const {data, handleChangeObject} = useContext(AuthContext)
    return (
        <PhoneContainer>
            <PhonePrefix>+7</PhonePrefix>
            <MaskedTextInput
                mask="999 999 99 99"
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
