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
import {useI18n} from "../../i18n/i18n";

function EnterNicknameStep() {
  const {
    data, handleChangeObject, navigation, dispatch
  } = useContext(AuthContext);

  const [loading, setLoading] = React.useState(true);
  const [availability, setAvailability] = React.useState(false);
  const [state, setState] = React.useState({});

  const t = useI18n()

  const nicknameValidationSchema = yup.object().shape({
    nickName: yup
      .string()
      .matches(/^(?=.*[a-z_.])[\w.]+$/, t('auth_errorNicknameFormat'))
      .min(3, t('auth_errorNicknameMinLength'))
      .max(30, t('auth_errorNicknameMaxLength'))
      .required(t('requiredField'))
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
    return <Text>{t('loading')}</Text>;
  }

  return (
    <AuthStep exit mt={44} maxWidth={344} text={t('auth_completeRegistrationSubtitle')} title={t('auth_completeRegistrationTitle')}>
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
            if (errors.nickName !== t('auth_errorNicknameFormat')) setCanRegistration(false);
          }
          return (
            <EnterNickNameStepContainer>
              <NicknameContainer>
                <NicknameLabel><NicknameLabelText>{t('nickname')}</NicknameLabelText></NicknameLabel>
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
                  {t('auth_nicknameChars')}
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
                  {t('auth_nicknameLength')}
                </EnterNickNameInfo>
                <AuthButton onPress={onHandleRegistration} active={canRegistration}>
                  {t('auth_register')}
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
