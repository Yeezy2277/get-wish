import { wishCRUD } from '../../http/CRUD';
import { RELOAD } from '../constants/wishListConstants';
import store from '../index';
import { $authHost } from '../../http';
import { SET_MY_WISH_LIST, SET_WISH_ADDED, SET_WISH_ID } from '../constants/wishConstants';

export const addWish = async (
  name,
  description,
  link,
  wishlist,
  images
) => {
  await wishCRUD.create({
    name,
    description,
    link,
    wishlist,
    images
  }).then(() => {
    store?.dispatch({
      type: RELOAD,
    });
  });
};

export const editWish = async (
  wishId,
  name,
  description,
  link,
  wishlist,
  addImages,
  deleteImages
) => {
  await wishCRUD.edit(wishId, {
    name,
    description,
    link,
    wishlist,
    addImages,
    deleteImages
  }).then(() => {
    store?.dispatch({
      type: RELOAD,
    });
  });
};

export const setWishId = async (id) => {
  store?.dispatch({
    type: SET_WISH_ID,
    payload: id
  });
};

export const setWishListAdded = async (id) => {
  store?.dispatch({
    type: SET_WISH_ADDED,
    payload: id
  });
};

export const getMyWishLists = async () => {
  return new Promise((resolve) => {
    const res = $authHost.get('/api/v1/wishlist/my').then((reponse) => {
      store?.dispatch({ type: SET_MY_WISH_LIST, payload: reponse?.data?.data });
    });
    resolve(res?.data);
  });
};
