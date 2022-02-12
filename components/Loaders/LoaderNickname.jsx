import React from 'react';
import {Animated} from 'react-native'
import {LoaderNicknameContainer, LoaderNicknameText} from "../../styles/loader";
import Easing from "react-native-web/dist/vendor/react-native/Animated/Easing";

function LoaderNickname({loading}) {
    let spinValue = new Animated.Value(0)
    const spin = () => {
        spinValue.setValue(0)
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start(() => spin())
    }

    const spinner = spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

    React.useEffect(() => {
        spin()
    })

    return (
        <LoaderNicknameContainer>
            <Animated.Image
                style={{
                    transform: [{rotate: spinner}] }}
                source={require('../../assets/images/icons/spinner.png')}
            />
            <LoaderNicknameText>Проверка никнейма...</LoaderNicknameText>
        </LoaderNicknameContainer>
    );
}

export default LoaderNickname;
