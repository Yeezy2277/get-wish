import React, {useContext} from 'react';
import AuthStep from "./AuthStep";
import {PhoneNumber} from "../index";
import {TextOffer, TextOfferPurple} from "../../styles/authSteps";
import AuthButton from "../Shared/AuthButton";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {sendCode} from "../../redux/actions/authActions";

function EnterNumberStep() {
    const {data, onNextStep} = useContext(AuthContext)

    const onPressNumberStep = async () => {
        const phoneNumber = data.phoneNumber.split(' ').join('')
        if (phoneNumber.length >= 10) {
            await sendCode(`+7${phoneNumber}`)
            onNextStep()
        }
    }

    const disabledNext = data.phoneNumber.split(' ').join('').length < 10

    return (
        <AuthStep mt={136} maxWidth={266} text="На этот номер будет отправлено СМС с кодом подтверждения" title="Введи номер телефона">
            <PhoneNumber/>
            <TextOffer>Нажимая на кнопку, ты соглашаешься с <TextOfferPurple>политикой
                конфиденциальности и условиями использованиями</TextOfferPurple></TextOffer>
            <AuthButton onPress={onPressNumberStep} colors={disabledNext ? ['#D4DAEC', '#D4DAEC'] : ['#FB26FF', '#8A24FF', '#8424FF']}>Получить код</AuthButton>
        </AuthStep>
    );
}

export default EnterNumberStep;
