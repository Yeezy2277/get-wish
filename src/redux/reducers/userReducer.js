import {
  ACCEPT_FRIEND, CANCEL_FRIEND,
  CANCEL_REQUEST,
  DELETE_ID_FROM_DATA, HANDLE_FRIEND,
  LOGOUT, SEND_REQUEST,
  SET_AUTH,
  SET_DATA, SET_FRIENDS, SET_INCOMING,
  SET_NICKNAME, SET_OUTGOING,
  SET_SEARCH,
  SET_SEARCH_DATA, SET_SEARCH_FRIENDS, SET_SEARCH_INCOMING, SET_SEARCH_OUTGOING,
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
  friends: [],
  friendsSearch: [],
  incomingRequest: [],
  incomingRequestSearch: [],
  outgoingRequest: [],
  outgoingRequestSearch: [],
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
    case SET_FRIENDS:
      return {
        ...state,
        friends: action.payload
      };
    case SET_SEARCH_FRIENDS:
      return {
        ...state,
        friendsSearch: action.payload
      };
    case SET_SEARCH_INCOMING:
      return {
        ...state,
        incomingRequestSearch: action.payload
      };
    case SET_SEARCH_OUTGOING:
      return {
        ...state,
        outgoingRequestSearch: action.payload
      };
    case SET_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SET_INCOMING:
      return {
        ...state,
        incomingRequest: action.payload
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
    case SET_OUTGOING:
      return {
        ...state,
        outgoingRequest: action.payload
      };
    case SEND_REQUEST:
      // eslint-disable-next-line no-nested-ternary
      const nameObj = action.payload?.type === 'QUERY' ? 'outgoingRequest'
        : action.payload?.type === 'SEARCH' ? 'outgoingRequestSearch' : 'users';
      const isProfile = action.payload?.type === 'PROFILE';
      let oneUser = false;
      let newUsers = [...state[nameObj]];
      const idx = newUsers.findIndex((el) => el.id === action.payload?.id);
      newUsers[idx] = { ...newUsers[idx], sendRequest: true, cancelRequest: false };
      if (oneUser?.id === action.payload?.id) {
        oneUser = true;
      }
      if (!isProfile) {
        return {
          ...state,
          ...(oneUser && { oneUser: { ...newUsers[idx], sendRequest: true, cancelRequest: false } }),
          [nameObj]: newUsers,
        };
      }
      return {
        ...state,
        oneUser: { ...state.oneUser, has_outgoing_friend_request: true }
      };
    case ACCEPT_FRIEND:
      let newIncoming = [...state.incomingRequest];
      const idxIncoming = newIncoming.findIndex((el) => el.id === action.payload);
      newIncoming[idxIncoming] = { ...newIncoming[idxIncoming], status: 'sent' };
      return {
        ...state,
        incomingRequest: newIncoming,
      };
    case HANDLE_FRIEND:
      let newOneUser = { ...state.oneUser };
      newOneUser.is_friend = action.payload;
      return {
        ...state,
        oneUser: newOneUser
      };
    case CANCEL_FRIEND:
      let newIncomingFriend = [...state.incomingRequest];
      const idxIncomingFriend = newIncomingFriend.findIndex((el) => el.id === action.payload);
      newIncomingFriend[idxIncomingFriend] = { ...newIncomingFriend[idxIncomingFriend], status: 'rejected' };
      return {
        ...state,
        incomingRequest: newIncomingFriend,
      };
    case CANCEL_REQUEST:
      const nameObjCancel = action.payload?.type === 'QUERY' ? 'outgoingRequest'
        : action.payload?.type === 'REQUEST' ? 'incomingRequest'
          : action.payload?.type === 'SEARCH_IN' ? 'incomingRequestSearch'
            : action.payload?.type === 'SEARCH_OUT' ? 'outgoingRequestSearch' : 'users';
      const isProfileCancel = action.payload?.type === 'PROFILE';
      let oneUserCancel = false;
      let newUsersCancel = [...state[nameObjCancel]];
      const idxCancel = newUsersCancel.findIndex((el) => el.id === action.payload?.id);
      newUsersCancel[idxCancel] = {
        ...newUsersCancel[idxCancel],
        cancelRequest: true,
        sendRequest: false,
        ...(action.payload?.type === 'REQUEST') && { status: 'rejected' }
      };
      if (oneUser?.id === action.payload?.id) {
        oneUserCancel = true;
      }
      if (!isProfileCancel) {
        return {
          ...state,
          ...(oneUserCancel
              && {
                oneUser: {
                  ...newUsersCancel[idxCancel],
                  cancelRequest: true,
                  sendRequest: false,
                  ...(action.payload?.type === 'REQUEST') && { status: 'rejected' }
                }
              }),
          [nameObjCancel]: newUsersCancel,
        };
      }
      return {
        ...state,
        oneUser: {
          ...state.oneUser,
          has_outgoing_friend_request: false
        }
      };

    case DELETE_ID_FROM_DATA:
      return {
        ...state,
        users: [...state.users?.filter((el) => el.id !== action.payload)]
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
