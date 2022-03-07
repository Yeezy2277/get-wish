import React from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native'
import {LoaderNicknameContainer, LoaderNicknameText} from "../../styles/loader";

function LoaderNickname({spin, spinValue, animate_state}) {

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

LoaderNickname.propTypes = {
    spin: PropTypes.func,
    spinValue: PropTypes.object,
    animate_state: PropTypes.object,
}


export default LoaderNickname;
