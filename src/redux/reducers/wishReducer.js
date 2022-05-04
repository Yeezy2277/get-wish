import {
  CANCEL_RESERVE_WISH, GO_BACK_ID,
  RESERVE_WISH,
  SET_MY_WISH_LIST, SET_ONE_WISH, SET_WISH, SET_WISH_ADDED, SET_WISH_ID
} from '../constants/wishConstants';

const initialState = {
  wish: [],
  myWishLists: [],
  oneWish: {},
  addedWishId: null,
  goBackId: null,
  addedWishIdBefore: null,
};

// eslint-disable-next-line default-param-last
export const wishReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WISH:
      return {
        ...state,
        addedWishList: action.payload
      };
    case GO_BACK_ID:
      return {
        ...state,
        goBackId: action.payload
      };
    case RESERVE_WISH:
      return {
        ...state,
        oneWish: { ...state.oneWish, user_id: action.payload.user, reservated: true }
      };
    case CANCEL_RESERVE_WISH:
      return {
        ...state,
        oneWish: {
          ...state.oneWish,
          user_id: null,
          user: null,
          reservated: false
        }
      };
    case SET_WISH_ADDED:
      return {
        ...state,
        addedWishIdBefore: action.payload
      };
    case SET_MY_WISH_LIST:
      return {
        ...state,
        myWishLists: action.payload
      };
    case SET_WISH_ID:
      return {
        ...state,
        addedWishId: action.payload
      };
    case SET_ONE_WISH:
      return {
        ...state,
        oneWish: action.payload
      };
    default:
      return state;
  }
};
