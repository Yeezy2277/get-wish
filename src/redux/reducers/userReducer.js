import {
  LOGOUT,
  SET_AUTH,
  SET_DATA,
  SET_NICKNAME,
  SET_SEARCH,
  SET_SEARCH_DATA,
  SET_SEARCH_START,
  SET_SEARCH_SUCCESS, SET_TYPE_SEARCH,
  SET_USER_INFO
} from '../constants/userConstants';

const initialState = {
  isAuth: false,
  nickname: false,
  userInfo: null,
  avatar: null,
  search: '',
  loading: false,
  typeSearch: 'friend',
  oneUser: {},
  users: [],
};

// eslint-disable-next-line default-param-last
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };
    case SET_TYPE_SEARCH:
      return {
        ...state,
        typeSearch: action.payload
      };
    case SET_SEARCH_START:
      return {
        ...state,
        loading: true
      };
    case SET_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case SET_SEARCH_DATA:
      return {
        ...state,
        users: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false
      };
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload
      };

    case SET_DATA:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
};
