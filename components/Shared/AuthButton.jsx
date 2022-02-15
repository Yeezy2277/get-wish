import React from 'react';
import {StyleSheet, View} from 'react-native'
import {ButtonAuthLabel} from "../../styles/shared";
import {TouchableHighlight, ImageBackground} from "react-native";

function AuthButton({children, active, onPress}) {
    return (
        <View style={styles.linearGradient}>
            <ImageBackground source={active ? require('../../assets/images/icons/Buttons.png') : require('../../assets/images/icons/ButtonsDisabled.png')} resizeMode="cover"
                            style={styles.linearGradient}>
                <TouchableHighlight style={styles.higlight} underlayColor={'none'} onPress={onPress}>
                    <ButtonAuthLabel>{children}</ButtonAuthLabel>
                </TouchableHighlight>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        width: 335,
        height: 50,
        paddingTop: 15,
        paddingBottom: 13,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    higlight: {
        width: 335,
        height: 50,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AuthButton;
