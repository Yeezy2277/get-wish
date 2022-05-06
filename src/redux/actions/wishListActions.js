import store from '../index';
import { $authHost } from '../../http';
import { parseError } from '../../http/utils';
import {
  ADD_THEMES, ADD_WISH_LIST, ARCHIVE_WISH_LIST, DICREMENT_COUNT, INCREMENT_COUNT, RELOAD, SET_COUNT, SET_USER_WISH_LIST,
  SET_WISH_LIST_ARCHIVE,
  SET_WISH_LIST_PRIVATE,
  SET_WISH_LIST_PUBLIC
} from '../constants/wishListConstants';
import { wishCRUD, wishlistCRUD } from '../../http/CRUD';
import {
  CANCEL_RESERVE_WISH,
  CANCEL_RESERVE_WISH_LIST,
  RESERVE_WISH,
  RESERVE_WISH_LIST
} from '../constants/wishConstants';
import { SET_RESERVED_WISH_LIST } from '../constants/userConstants';

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

export const reserveWish = async (wishId, anon, user) => {
  return new Promise((resolve, reject) => {
    $authHost.post(`/api/v1/wish/${wishId}/reserve`, { anon }).then(async ({ data }) => {
      store?.dispatch({ type: INCREMENT_COUNT });
      store?.dispatch({
        type: RESERVE_WISH,
        payload: {
          user
        }
      });
      store?.dispatch({
        type: RESERVE_WISH_LIST,
        payload: wishId
      });
      resolve(data?.data);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const deleteReserveWish = async (wishId, reserved) => {
  return new Promise((resolve, reject) => {
    $authHost.delete(`/api/v1/wish/${wishId}/reserve`).then(async ({ data }) => {
      if (!reserved) {
        store?.dispatch({ type: DICREMENT_COUNT });
        store?.dispatch({
          type: CANCEL_RESERVE_WISH,
        });
        store?.dispatch({
          type: CANCEL_RESERVE_WISH_LIST,
          payload: wishId
        });
      }
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

export const getUserReservedList = async (skip = 0, limit = 20) => {
  return new Promise((resolve, reject) => {
    $authHost.get(`/api/v1/user/wishes/reserved?skip=${skip}&take=${limit}`).then(async ({ data }) => {
      const wishes = data?.data;
      store?.dispatch({
        type: SET_RESERVED_WISH_LIST,
        payload: wishes
      });
      resolve(wishes);
    }).catch((error) => {
      reject(parseError(error));
    });
  });
};

export const archiveWishList = async (id, privateMode, el, isArchive = true) => {
  await wishlistCRUD.edit(id, {
    ...el, friends: [...el.friends.map((el) => el.id)], theme: el.theme.id, is_archive: isArchive
  }).then(() => {
    store?.dispatch({
      type: RELOAD,
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
