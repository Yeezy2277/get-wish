import React, { useContext } from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { InteractionManager, Text } from 'react-native';
import AuthStep from './AuthStep';
import AuthButton from '../Shared/AuthButton';
import {
  NicknameBottom, NicknameContainer, NicknameLabel, NicknameLabelText
} from '../../styles/shared';
import { Nickname } from '../index';
import { EnterNickNameInfo, EnterNickNameStepContainer, TextOfferPurple } from '../../styles/authSteps';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import { userCRUD } from '../../http/CRUD';
import { SET_AUTH, SET_USER_INFO } from '../../redux/constants/userConstants';
import { changeUserInfo } from '../../redux/actions/authActions';

function EnterNicknameStep() {
  const {
    data, handleChangeObject, navigation, dispatch
  } = useContext(AuthContext);

  const [loading, setLoading] = React.useState(true);
  const [availability, setAvailability] = React.useState(false);
  const [state, setState] = React.useState({});

  const nicknameValidationSchema = yup.object().shape({
    nickName: yup
      .string()
      .matches(/^(?=.*[a-z_.])[\w.]+$/, 'Допустимые символы: a-z, 0-9, . и _')
      .min(3, 'Никнейм должен содержать минимум 3 символа')
      .max(30, 'Никнейм должен содержать максимум 30 символов')
      .required('Обязательное поле')
  });

  const [canRegistration, setCanRegistration] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { data: user } = await userCRUD.search();
        if (user) {
          await dispatch({ type: SET_USER_INFO, payload: user });
          if (user?.username) {
            await dispatch({ type: SET_AUTH, payload: true });
            navigation.navigate('MainNavigator', { screen: 'Main' });
          }
        }
      } finally {
        setLoading(false);
      }
    }());
  }, []);

  let timeout;

  const onHandleRegistration = async () => {
    if (canRegistration) {
      await userCRUD.search().then(async (res) => {
        if (res.data.id) {
          clearTimeout(timeout);
          await userCRUD.edit(res.data.id, {
            username: data.username,
            phone: data.phone
          }).then(async (response) => {
            await changeUserInfo('userInfo', response?.data);
          });
          dispatch({ type: SET_AUTH, payload: true });
          navigation.navigate('MainNavigator', { screen: 'Main' });
        }
      }).catch(() => {
        timeout = setTimeout(onHandleRegistration, 10000);
      });
    }
  };

  React.useEffect(() => {
    if (Object.keys(state).length !== 0) {
      InteractionManager.runAfterInteractions(() => {
        state.focus();
      });
    }
  }, [state]);

  if (loading) {
    return <Text>Загрузка</Text>;
  }

  return (
    <AuthStep exit mt={44} maxWidth={344} text="Придумай никнейм, по которому другие пользователи смогут тебя найти" title="Последний штрих!">
      <Formik
        initialValues={{
          nickName: '',
        }}
        validateOnChange
        validationSchema={nicknameValidationSchema}
        onSubmit={(values) => {
          handleChangeObject('username', values.nickName);
          setCanRegistration(true);
        }}
      >
        {({ errors }) => {
          if (Object.keys(errors).length !== 0 || !availability) {
            if (errors.nickName !== 'Допустимые символы: a-z, 0-9, . и _') setCanRegistration(false);
          }
          return (
            <EnterNickNameStepContainer>
              <NicknameContainer>
                <NicknameLabel><NicknameLabelText>Никнейм</NicknameLabelText></NicknameLabel>
                <Field
                  setState={setState}
                  setCanRegistration={setCanRegistration}
                  availability={availability}
                  setAvailability={setAvailability}
                  component={Nickname}
                  name="nickName"
                />
              </NicknameContainer>
              <NicknameBottom>
                <EnterNickNameInfo>
                  Ты можешь использовать символы
                  <TextOfferPurple>a-z</TextOfferPurple>
                  ,
                  <TextOfferPurple>0-9</TextOfferPurple>
                  ,
                  <TextOfferPurple>.</TextOfferPurple>
                  {' '}
                  и
                  <TextOfferPurple>_</TextOfferPurple>
                  {' '}
                  .
                  Длина от 3 до 30 символов.
                </EnterNickNameInfo>
                <AuthButton onPress={onHandleRegistration} active={canRegistration}>
                  Зарегистрироваться
                </AuthButton>
              </NicknameBottom>
            </EnterNickNameStepContainer>
          );
        }}
      </Formik>
    </AuthStep>
  );
}

export default EnterNicknameStep;
