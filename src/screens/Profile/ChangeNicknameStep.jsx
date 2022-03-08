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

  const { show } = useToasts(2000, 'Никнейм успешно изменен');

  const nicknameValidationSchema = yup.object().shape({
    nickName: yup
      .string()
      .matches(/^(?=.*[a-z_.])[\w.]+$/, 'Допустимые символы: a-z, 0-9, . и _')
      .min(3, 'Никнейм должен содержать минимум 3 символа')
      .max(30, 'Никнейм должен содержать максимум 30 символов')
      .required('Обязательное поле')
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
            if (errors.nickName !== 'Допустимые символы: a-z, 0-9, . и _') setCanRegistration(false);
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
                Это твой публичный никнейм, по которому другие пользователи
                могут тебя найти или упоминать в своих публикациях.
              </ChangeNicknameP1>
              <ChangeNicknameP2>
                Ты можешь использовать символы
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
              <ChangeNicknameP2>Длина от 3 до 30 символов.</ChangeNicknameP2>
            </EnterNickNameStepContainer>
          );
        }}
      </Formik>
    </ChangeNicknameContainer>
  );
}

export default ChangeNicknameStep;
