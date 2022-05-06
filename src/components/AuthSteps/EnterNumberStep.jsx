import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthStep from './AuthStep';
import { PhoneNumber } from '../index';
import { TextOffer, TextOfferPurple } from '../../styles/authSteps';
import AuthButton from '../Shared/AuthButton';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import { sendCode } from '../../redux/actions/authActions';
import {useI18n} from "../../i18n/i18n";

function EnterNumberStep({ isChangePhone }) {
  const { data, onNextStep } = useContext(AuthContext);

  const onPressNumberStep = async () => {
    const phoneNumber = data.phoneNumber.split(' ').join('');
    if (phoneNumber.length >= 10) {
      await sendCode(`+7${phoneNumber}`);
      onNextStep();
    }
  };

  const t = useI18n()

  const disabledNext = data.phoneNumber.split(' ').join('').length < 10;
  const tosText = t('auth_tos', { returnObjects: true })

  return (
    <AuthStep isFirstStep isChangePhone={isChangePhone} mt={isChangePhone ? 44 : 136} maxWidth={266}
              text={t('auth_codeWillBeSent')}
              title={t('auth_enterPhoneTitle')}>
      <PhoneNumber />
      {!isChangePhone && (
      <TextOffer>
          {tosText[0]}
        <TextOfferPurple>
            {tosText[1]}
        </TextOfferPurple>
      </TextOffer>
      )}
      <AuthButton
        style={{ marginTop: isChangePhone ? 100 : 0 }}
        onPress={onPressNumberStep}
        active={!disabledNext}
      >
          {t('auth_getCode')}
      </AuthButton>
    </AuthStep>
  );
}

EnterNumberStep.propTypes = {
  isChangePhone: PropTypes.bool,
};

EnterNumberStep.defaultProps = {
  isChangePhone: false,
};

export default EnterNumberStep;
