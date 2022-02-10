import React, {useContext} from 'react';
import AuthStep from "./AuthStep";
import AuthButton from "../Shared/AuthButton";
import {AuthContext} from "../../screens/Auth/AuthScreen";

function EnterCodeStep() {
    const {data} = useContext(AuthContext)
    const [codes, setCodes] = React.useState(['', '', '', ''])
    return (
        <AuthStep header={true} mt={44} maxWidth={276} text="На этот номер был отправлен код подтверждения. Введи его в поле ниже." title={`+7 ${data.phoneNumber}`}>
            <AuthButton colors={data.phoneNumber.split(' ').join('').length < 10 ? ['#D4DAEC'] : ['#FB26FF', '#8A24FF', '#8424FF']}>Получить код</AuthButton>
        </AuthStep>
    );
}

export default EnterCodeStep;
