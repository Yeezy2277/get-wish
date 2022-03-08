import { $authHost } from '../../http';
import { parseError } from '../../http/utils';
import { changeUserInfo } from './authActions';

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
