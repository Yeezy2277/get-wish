import React from 'react';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../styles/main';
import { deleteUser, logout } from '../../redux/actions/authActions';
import {useI18n} from "../../i18n/i18n";

function MainScreen(props) {
  const { navigation } = props;
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const t = useI18n();

  const logoutHandler = async () => {
    await dispatch(logout());
    navigation.navigate('AuthNavigator', { screen: 'Auth' });
  };
  const deleteHandler = async () => {
    await dispatch(deleteUser(userInfo));
    navigation.navigate('AuthNavigator', { screen: 'Auth' });
  };
  return (
    <Container>
      <Button title={t('logout')} onPress={logoutHandler} />
      <Button title={t('deleteAccount')} onPress={deleteHandler} />
    </Container>
  );
}

export default MainScreen;
