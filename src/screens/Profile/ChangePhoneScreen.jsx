import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EnterCodeStep, EnterNumberStep } from '../../components';
import { AuthContext } from '../Auth/AuthScreen';

function ChangePhoneScreen({ navigation }) {
  const StepsComponents = {
    0: EnterNumberStep,
    1: EnterCodeStep,
  };

  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, []);

  const dispatch = useDispatch();
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

  const params = React.useMemo(() => ({
    onReloadStep, dispatch, navigation, step, onNextStep, data, handleChangeObject, onPrevStep
  }), [data, dispatch, handleChangeObject, navigation, step]);

  return (
    <AuthContext.Provider value={params}>
      <Step isChangePhone />
    </AuthContext.Provider>
  );
}

export default ChangePhoneScreen;
