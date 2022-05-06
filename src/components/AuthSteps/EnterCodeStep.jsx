import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, InteractionManager } from 'react-native';
import AuthStep from './AuthStep';
import AuthButton from '../Shared/AuthButton';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import {
  CodeElement,
  CodePlaceholder,
  Codes,
  CodeTextError,
  EnterCodeStepBottom,
  EnterCodeStepContainer
} from '../../styles/authSteps';
import EnterCodeStepTimer from './EnterCodeStepTimer';
import { checkCode } from '../../redux/actions/authActions';
import { navigateAction } from '../../functions/NavigationService';
import useToasts from '../../hooks/useToast';
import { updatePhone } from '../../redux/actions/userActions';
import { COLORS } from '../../functions/constants';

function EnterCodeStep({ isChangePhone }) {
  const {
    data, handleChangeObject, onNextStep, step
  } = React.useContext(AuthContext);
  const { show } = useToasts(2000, 'Телефон успешно изменен');
  const [codes, setCodes] = React.useState(['', '', '', '']);
  const handleChangeInput = (text, index) => {
    setCodes((prev) => {
      const newArr = [...prev];
      newArr[index] = text;
      return newArr;
    });
    if (text) {
      const idx = index + 1;
      if (codes[idx] !== undefined) {
        if (index === 0) state1?.focus();
        else if (index === 1) state2?.focus();
        else state3?.focus();
      } else {
        handleChangeObject('codes', [...codes, text].join(''));
      }
    }
  };

  const [error, setError] = React.useState(false);
  const [state, setState] = React.useState({});
  const [state1, setState1] = React.useState({});
  const [state2, setState2] = React.useState({});
  const [state3, setState3] = React.useState({});

  React.useEffect(() => {
    if (Object.keys(state).length !== 0) {
      InteractionManager.runAfterInteractions(() => {
        state.focus();
      });
    }
  }, [state, step]);

  const handleKeyPress = (keyValue, index) => {
    if (keyValue === 'Backspace' && index !== 0 && !codes[index]) {
      const idx = index - 1;
      if (index === 3) state2?.focus();
      else if (index === 2) state1?.focus();
      else state?.focus();
      const newCodes = [...codes];
      newCodes[idx] = '';
      setCodes(newCodes);
    }
  };

  let disabledNext = true;

  codes.forEach((el) => {
    disabledNext = !el;
  });

  const clearCode = () => {
    setCodes(['', '', '', '']);
    state?.focus();
    setError(true);
  };

  const onPressCodeStep = async () => {
    const phoneNumber = data.phoneNumber.split(' ').join('');
    if (!disabledNext) {
      if (isChangePhone) {
        await updatePhone(`+7${phoneNumber}`, codes.join('')).then(async () => {
          navigateAction('MainProfile');
          show();
        }).catch(() => {
          clearCode();
        });
      } else {
        await checkCode(`+7${phoneNumber}`, codes.join('')).then(async () => {
          onNextStep();
        }).catch(() => {
          clearCode();
        });
      }
    }
  };

  return (
    <AuthStep back mt={44} maxWidth={276} text="На этот номер был отправлен код подтверждения. Введи его в поле ниже." title={`+7 ${data.phoneNumber}`}>
      <EnterCodeStepContainer>
        <Codes>
          {codes.map((code, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CodeElement key={index}>
              {!codes[index] && <CodePlaceholder error={error && '#FFDEDE'} />}
              <TextInput
                ref={(input) => {
                  if (index === 0) setState(input);
                  else if (index === 1) setState1(input);
                  else if (index === 2) setState2(input);
                  else setState3(input);
                }}
                textContentType="telephoneNumber"
                maxLength={1}
                onKeyPress={({ nativeEvent: { key: keyValue } }) => handleKeyPress(keyValue, index)}
                onChangeText={(text) => handleChangeInput(text, index)}
                id={String(index)}
                keyboardType="numeric"
                autoFocus={index === 0}
                style={styles.inputStyle}
                value={code}
              />
            </CodeElement>
          ))}
        </Codes>
        {error && <CodeTextError>Введён неверный код</CodeTextError>}
        <EnterCodeStepBottom>
          <EnterCodeStepTimer />
          <AuthButton onPress={onPressCodeStep} active={!disabledNext}>Подтвердить</AuthButton>
        </EnterCodeStepBottom>
      </EnterCodeStepContainer>
    </AuthStep>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: 'Nunito',
    fontWeight: '600',
    width: 30,
    height: 30,
    color: COLORS.black,
    paddingLeft: 5,
    marginTop: 0,
    fontSize: 27,
  }
});

EnterCodeStep.propTypes = {
  isChangePhone: PropTypes.bool,
};

EnterCodeStep.defaultProps = {
  isChangePhone: false,
};

export default EnterCodeStep;
