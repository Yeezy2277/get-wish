import _ from 'lodash';
import { $authHost } from '../../http';
import { parseError } from '../../http/utils';
import { changeUserInfo } from './authActions';
import store from '../index';
import {
  SET_DATA, SET_SEARCH
} from '../constants/userConstants';
import { userCRUD } from '../../http/CRUD';

// const makeRequestCreator = () => {
//   let cancel;
//   return async (query, body) => {
//     if (cancel) {
//       cancel.cancel();
//     }
//     cancel = $authHost.CancelToken.source();
//     try {
//       if (resources[query]) {
//         return resources[query];
//       }
//       const res = await $authHost(query, { cancelToken: cancel.token, ...body });
//
//       const result = res.data.results;
//       resources[query] = result;
//
//       return result;
//     } catch (error) {
//       if ($authHost.isCancel(error)) {
//         console.log('Request canceled', error.message);
//       } else {
//         console.log('Something went wrong: ', error.message);
//       }
//     }
//   };
// };

const { dispatch } = store;

export const clearSearchData = () => {
  dispatch({
    type: SET_DATA,
    payload: {
      value: [],
      key: 'users'
    }
  });
};

export const onChangeSearch = _.memoize(async (action) => {
  dispatch({
    type: SET_SEARCH,
    payload: action
  });
  const res = await userCRUD.searchFilter({
    username: action,
    take: 10,
    skip: 0
  });
  return res?.data;
});

export const sendRequest = _.memoize(async (userId) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/friend/request', {
      user_id: userId
    }).then((response) => resolve(response)).catch(((error) => reject(error)));
  });
});

export const updateAvatar = async (avatar, id) => {
  return new Promise((resolve, reject) => {
    $authHost.post(`/api/v1/user/${id}/updateAvatar`, {
      avatar
    }).then(async ({ data }) => {
      await changeUserInfo('userInfo', data?.data);
      resolve(data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const updatePhone = async (phone, code) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/user/updatePhone', {
      phone,
      code
    }).then(async ({ data }) => {
      await changeUserInfo('userInfo', data?.data);
      resolve(data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};
