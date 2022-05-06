import {
  ADD_THEMES,
  ADD_WISH_LIST,
  ARCHIVE_WISH_LIST,
  DELETE_WISH_LIST, DICREMENT_COUNT,
  HANDLE_DELETED_SELECTED_FRIENDS,
  HANDLE_SELECTED_FRIENDS, INCREMENT_COUNT,
  SET_COUNT,
  SET_ONE_WISH_LIST,
  SET_USER_WISH_LIST,
  SET_WISH_LIST_ARCHIVE,
  SET_WISH_LIST_PRIVATE,
  SET_WISH_LIST_PUBLIC
} from '../constants/wishListConstants';
import { CANCEL_RESERVE_WISH, CANCEL_RESERVE_WISH_LIST, RESERVE_WISH_LIST } from '../constants/wishConstants';

const initialState = {
  oneWishList: {},
  selectedFriends: [],
  publicWishLists: [],
  archiveWishLists: [],
  privateWishLists: [],
  userWishLists: [],
  countRes: null,
  themes: [],
};

// eslint-disable-next-line default-param-last
export const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_RESERVE_WISH_LIST:
      let wishes = [...state.oneWishList?.wishes];
      let idx = wishes.findIndex((el) => el.id === action.payload);
      wishes[idx] = { ...wishes[idx], reservated: false };
      return {
        ...state,
        oneWishList: {
          ...state.oneWishList,
          wishes: [...wishes]
        }
      };
    case RESERVE_WISH_LIST:
      let wishesAdd = [...state.oneWishList?.wishes];
      let idxAdd = wishesAdd.findIndex((el) => el.id === action.payload);
      wishesAdd[idxAdd] = { ...wishesAdd[idxAdd], reservated: true };
      return {
        ...state,
        oneWishList: {
          ...state.oneWishList,
          wishes: [...wishesAdd]
        }
      };

    case SET_COUNT:
      return {
        ...state,
        countRes: action.payload
      };
    case DICREMENT_COUNT:
      return {
        ...state,
        countRes: state.countRes - 1
      };
    case INCREMENT_COUNT:
      return {
        ...state,
        countRes: state.countRes + 1
      };
    case SET_ONE_WISH_LIST:
      return {
        ...state,
        oneWishList: action.payload
      };
    case SET_USER_WISH_LIST:
      return {
        ...state,
        userWishLists: action.payload
      };
    case SET_WISH_LIST_PUBLIC:
      return {
        ...state,
        publicWishLists: action.payload
      };
    case ADD_WISH_LIST:
      const type = action.payload?.type === 1 ? 'publicWishLists' : action.payload?.type === 2 ? 'privateWishLists'
        : 'archiveWishLists';
      return {
        ...state,
        [type]: [...state[type], action.payload?.data]
      };
    case DELETE_WISH_LIST:
      const typeDelete = action.payload?.type === 1 ? 'publicWishLists' : action.payload?.type === 2 ? 'privateWishLists'
        : 'archiveWishLists';
      return {
        ...state,
        [typeDelete]: [...state[typeDelete].filter((el) => el.id !== action.payload?.data)]
      };
    case ARCHIVE_WISH_LIST:
      const typeArchive = action.payload?.type === 1 ? 'publicWishLists' : 'privateWishLists';
      return {
        ...state,
        [typeArchive]: [...state[typeArchive].filter((el) => el.id !== action.payload?.data)]
      };
    case SET_WISH_LIST_PRIVATE:
      return {
        ...state,
        privateWishLists: action.payload
      };
    case SET_WISH_LIST_ARCHIVE:
      return {
        ...state,
        archiveWishLists: action.payload
      };
    case HANDLE_SELECTED_FRIENDS:
      return {
        ...state,
        selectedFriends: action.payload
      };
    case ADD_THEMES:
      return {
        ...state,
        themes: action.payload
      };
    case HANDLE_DELETED_SELECTED_FRIENDS:
      return {
        ...state,
        selectedFriends: [...state.selectedFriends.filter((el) => el !== action.payload)]
      };
    default:
      return state;
  }
};
