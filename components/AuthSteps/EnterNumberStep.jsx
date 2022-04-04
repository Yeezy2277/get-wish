import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import AuthStep from "./AuthStep";
import {PhoneNumber} from "../index";
import {TextOffer, TextOfferPurple} from "../../styles/authSteps";
import AuthButton from "../Shared/AuthButton";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {sendCode} from "../../redux/actions/authActions";
import {useI18n} from "../../i18n/i18n";

function EnterNumberStep(props) {
    const {data, onNextStep} = useContext(AuthContext)


    const onPressNumberStep = async () => {
        const phoneNumber = data.phoneNumber.split(' ').join('')
        if (phoneNumber.length >= 10) {
            await sendCode(`+7${phoneNumber}`)
            onNextStep()
        }
    }

    const disabledNext = data.phoneNumber.split(' ').join('').length < 10

    const t = useI18n()
    const tosText = t('auth_tos', {returnObjects: true});

    return (
        <AuthStep isFirstStep isChangePhone={props?.isChangePhone} mt={props?.isChangePhone ? 44 : 136} maxWidth={266} text={t('auth_codeWillBeSent')} title={t('auth_enterPhoneTitle')}>
                <PhoneNumber/>
                {!props?.isChangePhone && (
                    <TextOffer>
                        {tosText[0]}
                        <TextOfferPurple>{tosText[1]}</TextOfferPurple>
                    </TextOffer>
                )}
                <AuthButton style={{marginTop: props?.isChangePhone && 100}} onPress={onPressNumberStep} active={!disabledNext}>{t('getCode')}</AuthButton>
        </AuthStep>
    );
}

EnterNumberStep.propTypes = {
    isChangePhone: PropTypes.bool,
};

export default EnterNumberStep;
