import React from 'react';
import {
  TimerContainer, TimerNumber, TimerTexts, TimerTextSendAgain
} from '../../styles/authSteps';
import { sendCode } from '../../redux/actions/authActions';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import {useI18n} from "../../i18n/i18n";

function EnterCodeStepTimer() {
  const [seconds, setSeconds] = React.useState(60);
  const { data } = React.useContext(AuthContext);
  const t = useI18n()
  React.useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleSendCodeAgain = async () => {
    const phoneNumber = data.phoneNumber.split(' ').join('');
    await sendCode(`+7${phoneNumber}`);
    setSeconds(60);
  };

  return (
    seconds !== 0
      ? (
        <TimerContainer>
          <TimerTexts>{t('auth_resendCode')}</TimerTexts>
          <TimerNumber>
            0:
            {seconds}
          </TimerNumber>
        </TimerContainer>
      )
      : (
        <TimerContainer>
          <TimerTextSendAgain onPress={handleSendCodeAgain}>{t('auth_resendCode')}</TimerTextSendAgain>
        </TimerContainer>
      )
  );
}

export default EnterCodeStepTimer;
