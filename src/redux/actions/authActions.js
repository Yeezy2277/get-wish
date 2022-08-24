import AsyncStorage from '@react-native-async-storage/async-storage';
import { $authHost, $host } from '../../http';
import { parseError } from '../../http/utils';
import { LOGOUT, SET_DATA, SET_NICKNAME } from '../constants/userConstants';
import { userCRUD } from '../../http/CRUD';
import store from '../index';

const { dispatch } = store;

export const sendCode = async (phone) => {
  try {
    return await $host.post('/api/v1/auth/code/send', {
      phone
    });
  } catch (e) {
    console.log('error', e);
    return null;
  }
};

export const changeUserInfo = (key, value) => {
  try {
    dispatch({
      type: SET_DATA,
      payload: {
        key, value
      }
    });
  } catch (e) {
    console.log('error', e);
  }
};

export const checkAvailability = async (username) => {
  try {
    const res = await $authHost.post('/api/v1/user/availability', {
      username
    });
    return res.status === 200;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const checkCode = async (phone, code) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    await $host.post('/api/v1/auth/code/check', {
      phone,
      code
    }).then(async ({ data }) => {
      // eslint-disable-next-line camelcase
      const { access_token, refresh_token } = data;
      await AsyncStorage.setItem('token', access_token);
      await AsyncStorage.setItem('refreshToken', refresh_token);
      resolve();
    }).catch((error) => {
      reject(error.response.data);
    });
  });
};

export const logout = () => async (dispatchLogout) => {
  await $authHost.post('/api/v1/user/logout');
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
  dispatchLogout({ type: LOGOUT });
  dispatchLogout({ type: SET_NICKNAME, payload: false });
};

export const deleteUser = (userInfo) => async (dispatchDelete) => {
  await userCRUD.delete(userInfo.id);
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');
  dispatchDelete({ type: LOGOUT });
  dispatchDelete({ type: SET_NICKNAME, payload: false });
};

export const refresh = async () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    await $host.post('/api/v1/auth/token/refresh', {
      refresh_token: await AsyncStorage.getItem('refreshToken')
    }).then(async ({ data }) => {
      // eslint-disable-next-line camelcase
      const { access_token, refresh_token } = data;
      await AsyncStorage.setItem('token', access_token);
      await AsyncStorage.setItem('refreshToken', refresh_token);
      resolve();
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};
