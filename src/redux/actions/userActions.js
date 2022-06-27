import _ from 'lodash';
import { $authHost } from '../../http';
import { parseError } from '../../http/utils';
import { changeUserInfo } from './authActions';
import store from '../index';
import {
  ACCEPT_FRIEND,
  CANCEL_REQUEST, HANDLE_FRIEND,
  SEND_REQUEST,
  SET_DATA,
  SET_FRIENDS,
  SET_INCOMING,
  SET_OUTGOING,
  SET_SEARCH,
  SET_SEARCH_FRIENDS,
  SET_SEARCH_INCOMING,
  SET_SEARCH_OUTGOING
} from '../constants/userConstants';
import { userCRUD } from '../../http/CRUD';

export const clearSearchData = () => {
  store?.dispatch({
    type: SET_DATA,
    payload: {
      value: [],
      key: 'users'
    }
  });
};

export const onChangeSearch = async (action) => {
  store?.dispatch({
    type: SET_SEARCH,
    payload: action
  });
  const res = await userCRUD.searchFilter({
    username: action,
    take: 1000,
    skip: 0
  });
  return res?.data;
};

export const sendRequest = async (userId, type) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/friend/request', {
      user_id: userId
    }).then((response) => {
      store?.dispatch({ type: SEND_REQUEST, payload: { id: userId, type } });
      resolve(response);
    }).catch(((error) => reject(error)));
  });
};

export const cancelRequest = async (userId, type) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/friend/request/outgoing/cancel', {
      user_id: userId
    }).then((response) => {
      store?.dispatch({ type: CANCEL_REQUEST, payload: { id: userId, type } });
      resolve(response);
    }).catch(((error) => reject(error)));
  });
};

export const acceptFriend = async (userId) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/friend/request/accept', {
      user_id: userId
    }).then((response) => {
      store?.dispatch({ type: ACCEPT_FRIEND, payload: userId });
      resolve(response);
    }).catch(((error) => reject(error)));
  });
};

export const cancelFriend = async (userId, type) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/friend/request/cancel', {
      user_id: userId
    }).then((response) => {
      store?.dispatch({ type: CANCEL_REQUEST, payload: { id: userId, type } });
      resolve(response);
    }).catch(((error) => reject(error)));
  });
};

export const ban = _.memoize(async (userId) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/user/block', {
      user_id: userId
    }).then((response) => resolve(response)).catch(((error) => reject(error)));
  });
});

export const getIncoming = async (username) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/friend/request/incoming/query', {
      username,
      take: 1000,
      skip: 0
    }).then(async ({ data }) => {
      store?.dispatch({
        type: username ? SET_SEARCH_INCOMING : SET_INCOMING,
        payload: data?.data
      });
      resolve(data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const deleteFriend = async (userId) => {
  return new Promise((resolve, reject) => {
    $authHost.delete('/api/v1/friend', {
      data: { user_id: userId }
    }).then(async () => {
      store?.dispatch({
        type: HANDLE_FRIEND,
        payload: false
      });
      resolve(true);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const getFriends = async (username, patch = true) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/friend/query', {
      username,
      take: 1000,
      skip: 0
    }).then(async ({ data }) => {
      if (patch) {
        store?.dispatch({
          type: username ? SET_SEARCH_FRIENDS : SET_FRIENDS,
          payload: data?.data
        });
      }
      resolve(data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const getOutgoing = async (username) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/friend/request/outgoing/query', {
      username,
      take: 1000,
      skip: 0
    }).then(async ({ data }) => {
      store?.dispatch({
        type: username ? SET_SEARCH_OUTGOING : SET_OUTGOING,
        payload: data?.data
      });
      resolve(data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

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

export const getOneUser = async (id) => {
  return new Promise((resolve, reject) => {
    $authHost.get(`/api/v1/user/${id}`).then(async ({ data }) => {
      resolve(data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const openUser = async (tag) => {
  console.log('tag', tag)
  return new Promise((resolve, reject) => {
    $authHost.get(`/api/v1/user/by/username/${tag}`).then(async ({ data }) => {
      resolve(data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};
