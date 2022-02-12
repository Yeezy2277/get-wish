import React from 'react';
import {Animated} from 'react-native'
import {LoaderNicknameContainer, LoaderNicknameText} from "../../styles/loader";

function LoaderNickname({spin, spinValue, animate_state, loading}) {

    const spinner = spinValue.interpolate({
            inputRange: [animate_state.start, animate_state.end],
            outputRange: ['0deg', '360deg']
        })

    React.useEffect(() => {
        (async function () {
            await spin()
        }())
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
