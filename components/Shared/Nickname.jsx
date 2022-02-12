import React from 'react';
import {NicknameError, NicknameField, NicknameInput} from "../../styles/shared";
import {LoaderNickname} from "../index";

function Nickname(props) {
    const {
        field: { name, onChange, value },
        form: { errors, touched, submitForm },
        ...inputProps
    } = props
    let timeout
    let timeout2
    const hasError = errors[name] && touched[name]
    const [loading, setLoading] = React.useState(false)
    const [preLoading, setPreLoading] = React.useState(false)

    const showLoading = () => {
        setPreLoading(true)
        timeout = setTimeout(function(){
            setLoading(true)
            timeout2 = setTimeout(function(){setLoading(false); setPreLoading(false); submitForm()} , 1500);
        } , 300);
    }

    return (
        <>
            <NicknameInput value={value}
                           onChangeText={(text) => {
                               showLoading()
                               onChange(name)(text)
                           }}
                           autoCapitalize="none"/>
            {hasError && !preLoading && !loading && <NicknameError>{errors[name]}</NicknameError>}
            {loading && <LoaderNickname loading={loading}/>}
        </>
    );
}

export default Nickname
