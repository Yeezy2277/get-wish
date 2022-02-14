import React from 'react';
import {NicknameError, NicknameField, NicknameInput, NicknameSuccess} from "../../styles/shared";
import {LoaderNickname} from "../index";
import {Animated} from "react-native";
import Easing from "react-native-web/dist/vendor/react-native/Animated/Easing";
import {delay} from "../../functions";

function Nickname(props) {
    const {
        field: { name, onChange, value },
        form: { errors, touched, submitForm, isSubmitting},
    } = props
    let timeout
    const hasError = errors[name] && touched[name]
    const [loading, setLoading] = React.useState(false)
    const [preLoading, setPreLoading] = React.useState(false)

    const animate_state = {
        start: 0,
        end: 100
    }

    let spinValue = new Animated.Value(0)

    const spin = async () => {
        await Animated.timing(
            spinValue,
            {
                toValue: animate_state.end,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start(async () => {
            await spin()
        })
    }

    const showLoading = async () => {
        setPreLoading(true);
        await delay(1200)
        setLoading(true)
        timeout = setTimeout(function () {
            setLoading(false);
            setPreLoading(false);
            submitForm()
            clearTimeout(timeout)
        }, 1500);
    }

    return (
        <>
            <NicknameInput value={value}
                           onChangeText={async (text) => {
                               await onChange(name)(text)
                               loading ? setLoading(false) : await showLoading(text)
                           }}
                           autoCapitalize="none"/>
            {!hasError && isSubmitting && !preLoading && !loading && <NicknameSuccess>Никнейм свободен</NicknameSuccess>}
            {hasError && !preLoading && !loading && <NicknameError>{errors[name]}</NicknameError>}
            {loading && <LoaderNickname loading={loading} animate_state={animate_state} spin={spin} spinValue={spinValue}/>}
        </>
    );
}

export default Nickname
