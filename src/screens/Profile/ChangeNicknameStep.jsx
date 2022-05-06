import React from 'react';
import { Pressable, Text } from 'native-base';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import {
  HeaderTitle, PressableTextField, TextFieldCloseIcon,
  TextFieldLabel,
  TextFieldLabelText, TextFieldTwoContainer
} from '../../styles/shared';
import { TextFieldTwo } from '../../components';
import {
  AuthStepCancelText, ChangeNicknameP1, ChangeNicknameP2, ChangeNicknamePurple,
  EnterNickNameStepContainer,
} from '../../styles/authSteps';
import { ChangeNicknameContainer, ChangeNicknameHeader } from '../../styles/profile';
import { navigateAction } from '../../functions/NavigationService';
import { userCRUD } from '../../http/CRUD';
import useToasts from '../../hooks/useToast';
import { changeUserInfo } from '../../redux/actions/authActions';
import {useI18n} from "../../i18n/i18n";

function ChangeNicknameStep({ navigation }) {

  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, []);

  const { userInfo } = useSelector((state) => state.user);

  const [username, setUserName] = React.useState(userInfo?.username);
  const [availability, setAvailability] = React.useState(false);

  const t = useI18n()

  const { show } = useToasts(2000, 'Никнейм успешно изменен');

  const nicknameValidationSchema = yup.object().shape({
    nickName: yup
      .string()
      .matches(/^(?=.*[a-z_.])[\w.]+$/, t('auth_errorNicknameFormat'))
      .min(3, t('auth_errorNicknameMinLength'))
      .max(30, t('auth_errorNicknameMaxLength'))
      .required(t('requiredField'))
  });

  const [canRegistration, setCanRegistration] = React.useState(false);

  const handleChangeNickname = async () => {
    if (canRegistration) {
      await userCRUD.edit(userInfo.id, {
        ...userInfo,
        username,
      }).then(async ({ data }) => {
        await changeUserInfo('userInfo', data);
        await navigateAction('MainProfile');
        await show();
      });
    }
  };

  return (
    <ChangeNicknameContainer>
      <ChangeNicknameHeader>
        <Pressable onPress={() => navigateAction('MainProfile')}>
          <AuthStepCancelText>Отмена</AuthStepCancelText>
        </Pressable>
        <HeaderTitle>Никнейм</HeaderTitle>
        <Pressable onPress={handleChangeNickname}>
          <Text color={canRegistration ? '#8424FF' : '#D4DAEC'} fontFamily="Nunito" fontWeight="bold" fontSize={16}>Готово</Text>
        </Pressable>
      </ChangeNicknameHeader>
      <Formik
        initialValues={{
          nickName: username,
        }}
        validateOnChange
        validationSchema={nicknameValidationSchema}
        onSubmit={(values) => {
          setCanRegistration(true);
          setUserName(values.nickName);
        }}
      >
        {({ errors, setFieldValue }) => {
          if (Object.keys(errors).length !== 0 || !availability) {
            if (errors.nickName !== t('auth_errorNicknameFormat')) setCanRegistration(false);
          }
          return (
            <EnterNickNameStepContainer>
              <TextFieldTwoContainer>
                <TextFieldLabel><TextFieldLabelText>Никнейм</TextFieldLabelText></TextFieldLabel>
                <PressableTextField onPress={() => {
                  setUserName('');
                  setFieldValue('nickName', '');
                }}
                >
                  <TextFieldCloseIcon source={require('../../assets/images/icons/closeIcon.png')} resizeMode="cover" />
                </PressableTextField>
                <Field
                  setCanRegistration={setCanRegistration}
                  availability={availability}
                  setAvailability={setAvailability}
                  component={TextFieldTwo}
                  name="nickName"
                />
              </TextFieldTwoContainer>
              <ChangeNicknameP1>
                {t('profile_nicknameInfo')}
              </ChangeNicknameP1>
              <ChangeNicknameP2>
                {t('auth_nicknameChars')}
                <ChangeNicknamePurple>a-z</ChangeNicknamePurple>
                ,
                <ChangeNicknamePurple>0-9</ChangeNicknamePurple>
                ,
                <ChangeNicknamePurple>.</ChangeNicknamePurple>
                {' '}
                и
                <ChangeNicknamePurple>_</ChangeNicknamePurple>
                {' '}
                .
              </ChangeNicknameP2>
              <ChangeNicknameP2>{t('auth_nicknameLength')}</ChangeNicknameP2>
            </EnterNickNameStepContainer>
          );
        }}
      </Formik>
    </ChangeNicknameContainer>
  );
}

export default ChangeNicknameStep;
