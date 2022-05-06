import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EnterCodeStep, EnterNicknameStep, EnterNumberStep } from '../../components';
import {useI18n} from "../../i18n/i18n";

export const AuthContext = React.createContext(undefined);

function AuthScreen(props) {
  const StepsComponents = {
    0: EnterNumberStep,
    1: EnterCodeStep,
    2: EnterNicknameStep,
  };

  const dispatch = useDispatch();
  const { nickname } = useSelector((state) => state.user);
  const { screenProps, navigation } = props;
  const [loading, setLoading] = React.useState(true);
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    id: '',
    phoneNumber: '',
    codes: '',
    username: ''
  });

  const Step = StepsComponents[step];

  const handleChangeObject = useCallback(
    (key, value) => setData({ ...data, [key]: value }),
    [data]
  );

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onReloadStep = () => {
    setStep(0);
  };

  const t = useI18n()

  React.useEffect(() => {
    setLoading(true);
    if (nickname) {
      setStep(2);
    }
    setLoading(false);
  }, [screenProps]);

  const params = React.useMemo(() => ({
    onReloadStep, dispatch, navigation, step, onNextStep, data, handleChangeObject, onPrevStep
  }), [data, dispatch, handleChangeObject, navigation, step]);

  return (
    <AuthContext.Provider value={params}>
      {loading ? <Text>{t('loading')}</Text> : (
        <Step />
      )}
    </AuthContext.Provider>
  );
}

export default AuthScreen;
