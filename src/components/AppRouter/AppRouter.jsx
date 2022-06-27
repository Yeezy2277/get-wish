import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native';
import { refresh } from '../../redux/actions/authActions';
import { userCRUD } from '../../http/CRUD';
import {SET_AUTH, SET_FRIENDS, SET_NICKNAME, SET_USER_INFO} from '../../redux/constants/userConstants';
import MainRouter from './MainRouter';
import AuthRouter from './AuthRouter';
import NavigationService from '../../functions/NavigationService';
import {getFriends} from "../../redux/actions/userActions";

function AppRouter() {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async function Start() {
      setLoading(true);
      await refresh().then(async () => {
        const { data: user } = await userCRUD.search();
        if (user) {
          dispatch({ type: SET_USER_INFO, payload: user });
          if (!user?.username) {
            dispatch({ type: SET_NICKNAME, payload: true });
          } else {
            dispatch({ type: SET_AUTH, payload: true });
            const {data} = await getFriends();
            dispatch({ type: SET_FRIENDS, payload: data });
          }
        }
      }).finally(() => setLoading(false));
    }());
  }, []);

  if (loading) {
    return <Text>Загрузка</Text>;
  }

  return (
    <>
      {isAuth && <MainRouter screenProps={{ nextStart: 'Main' }} />}
      {!isAuth && (
      <AuthRouter ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      />
      )}
    </>
  );
}

export default AppRouter;
