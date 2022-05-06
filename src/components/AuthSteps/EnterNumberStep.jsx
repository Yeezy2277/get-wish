import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthStep from './AuthStep';
import { PhoneNumber } from '../index';
import { TextOffer, TextOfferPurple } from '../../styles/authSteps';
import AuthButton from '../Shared/AuthButton';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import { sendCode } from '../../redux/actions/authActions';

function EnterNumberStep({ isChangePhone }) {
  const { data, onNextStep } = useContext(AuthContext);

  const onPressNumberStep = async () => {
    const phoneNumber = data.phoneNumber.split(' ').join('');
    if (phoneNumber.length >= 10) {
      await sendCode(`+7${phoneNumber}`);
      onNextStep();
    }
  };

  const disabledNext = data.phoneNumber.split(' ').join('').length < 10;

  return (
    <AuthStep isFirstStep isChangePhone={isChangePhone} mt={isChangePhone ? 44 : 136} maxWidth={266} text="На этот номер будет отправлено СМС с кодом подтверждения" title="Введи номер телефона">
      <PhoneNumber />
      {!isChangePhone && (
      <TextOffer>
        Нажимая на кнопку, ты соглашаешься с
        <TextOfferPurple>
          политикой
          конфиденциальности и условиями использованиями
        </TextOfferPurple>
      </TextOffer>
      )}
      <AuthButton
        style={{ marginTop: isChangePhone ? 100 : 0 }}
        onPress={onPressNumberStep}
        active={!disabledNext}
      >
        Получить код
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
