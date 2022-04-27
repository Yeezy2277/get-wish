import store from '../index';
import { $authHost } from '../../http';
import { parseError } from '../../http/utils';
import {
  ADD_THEMES, ADD_WISH_LIST, ARCHIVE_WISH_LIST, RELOAD, SET_COUNT, SET_USER_WISH_LIST,
  SET_WISH_LIST_ARCHIVE,
  SET_WISH_LIST_PRIVATE,
  SET_WISH_LIST_PUBLIC
} from '../constants/wishListConstants';
import { wishCRUD, wishlistCRUD } from '../../http/CRUD';

export const getCountInUser = async (userId) => {
  return new Promise((resolve, reject) => {
    $authHost.get(`/api/v1/friend/${userId}/reservations/count`).then(async ({ data }) => {
      store?.dispatch({
        type: SET_COUNT,
        payload: data?.data?.count
      });
      resolve(data?.data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const reserveWish = async (wishId, anon) => {
  return new Promise((resolve, reject) => {
    $authHost.post(`/api/v1/wish/${wishId}/reserve`, { anon }).then(async ({ data }) => {
      store?.dispatch({
        type: RELOAD,
      });
      resolve(data?.data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const deleteReserveWish = async (wishId) => {
  return new Promise((resolve, reject) => {
    $authHost.delete(`/api/v1/wish/${wishId}/reserve`).then(async ({ data }) => {
      store?.dispatch({
        type: RELOAD,
      });
      resolve(data?.data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const getThemes = async () => {
  return new Promise((resolve, reject) => {
    $authHost.get('/api/v1/wishlisttheme').then(async ({ data }) => {
      store?.dispatch({
        type: ADD_THEMES,
        payload: data?.data
      });
      resolve(data?.data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const createWishList = async ({
  name, theme, privateMode, friends
}) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/wishlist', {
      name,
      theme,
      private: privateMode,
      friends
    }).then(async ({ data }) => {
      const newWishList = data?.data;
      store?.dispatch({
        type: ADD_WISH_LIST,
        payload: {
          type: privateMode ? 2 : 1,
          data: newWishList
        }
      });
      resolve(data?.data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const getWishListUser = async ({
  userId
}) => {
  return new Promise((resolve, reject) => {
    $authHost.get(`/api/v1/user/${userId}/wishlists`).then(async ({ data }) => {
      const newWishList = data?.data;
      store?.dispatch({
        type: SET_USER_WISH_LIST,
        payload: newWishList
      });
      resolve(data?.data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const archiveWishList = async (id, privateMode, el) => {
  await wishlistCRUD.edit(id, { ...el, theme: el.theme.id, is_archive: true }).then(() => {
    store?.dispatch({
      type: ARCHIVE_WISH_LIST,
      payload: {
        type: privateMode ? 2 : 1,
        data: id
      }
    });
  });
};

export const deleteWish = async (id) => {
  await wishCRUD.delete(id).then(() => {
    store?.dispatch({
      type: RELOAD,
    });
  });
};

export const deleteWishList = async (id) => {
  await wishlistCRUD.delete(id).then(() => {
    store?.dispatch({
      type: RELOAD,
    });
  });
};

export const filterWishList = async ({
  type = 1
}) => {
  return new Promise((resolve, reject) => {
    $authHost.post('/api/v1/wishlist/filter/my', {
      type
    }).then(async ({ data }) => {
      switch (type) {
        case 1: {
          store?.dispatch({ type: SET_WISH_LIST_PUBLIC, payload: data?.data });
          break;
        }
        case 2: {
          store?.dispatch({ type: SET_WISH_LIST_PRIVATE, payload: data?.data });
          break;
        }
        default: {
          store?.dispatch({ type: SET_WISH_LIST_ARCHIVE, payload: data?.data });
          break;
        }
      }
      resolve(data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};
