import React from 'react';
import {StyleSheet, View} from 'react-native'
import {ButtonAuthLabel} from "../../styles/shared";
import { LinearGradient } from 'expo-linear-gradient';
import {TouchableHighlight} from "react-native";

function AuthButton({children, colors, onPress}) {
    return (
        <View style={styles.linearGradient}>
            <LinearGradient locations={[0,0.5,0.6]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.linearGradient} colors={colors}>
                <TouchableHighlight style={styles.higlight} underlayColor={'gray'} onPress={onPress}>
                    <ButtonAuthLabel>{children}</ButtonAuthLabel>
                </TouchableHighlight>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        width: '100%',
        height: 50,
        borderRadius: 12,
        paddingTop: 15,
        paddingBottom: 13,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    higlight: {
        width: '100%',
        height: 50,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AuthButton;
