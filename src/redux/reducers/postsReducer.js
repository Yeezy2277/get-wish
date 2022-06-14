import {
  CANCEL_RESERVE_WISH, GO_BACK_ID,
  RESERVE_WISH,
  SET_MY_WISH_LIST, SET_ONE_WISH, SET_WISH, SET_WISH_ADDED, SET_WISH_ID
} from '../constants/wishConstants';
import {
  DELETE_COMMENT,
  LIKE, REMOVE_POST, SET_COMMENTS, SET_POSTS_USER, SET_POSTS_USER_OTHER, UNLIKE
} from '../constants/postsConstants';
import store from '../index';

const initialState = {
  userPosts: [],
  comments: [],
  otherUserPosts: [],
};

// eslint-disable-next-line default-param-last
export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS_USER:
      return {
        ...state,
        userPosts: action.payload
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case SET_POSTS_USER_OTHER:
      return {
        ...state,
        otherUserPosts: action.payload
      };
    case LIKE:
      let targetLike = action.payload?.my ? 'userPosts' : 'otherUserPosts';
      let array = [...state[targetLike]];
      let idx = array.findIndex((el) => el.id === action.payload.id);
      let countLike = array[idx]?.likes?.count ? array[idx]?.likes?.count : 0;
      let prev = array[idx]?.likes?.friends?.length ? array[idx]?.likes?.friends : [];
      array[idx] = {
        ...array[idx],
        likes: {
          count: countLike + 1,
          friends: [
            ...prev,
            { user: action.payload.user }
          ]
        }
      };
      return {
        ...state,
        [targetLike]: array
      };
    case REMOVE_POST:
      let removed = [...state.userPosts.filter((el) => el.id !== action.payload)];
      return {
        ...state,
        userPosts: removed
      };
    case DELETE_COMMENT:
      let removedComment = [...state.comments.filter((el) => el.id !== action.payload)];
      return {
        ...state,
        comments: removedComment
      };
    case UNLIKE:
      let targetUnlike = action.payload?.my ? 'userPosts' : 'otherUserPosts';
      let arrayUnlike = [...state[targetUnlike]];
      let idxUnlike = arrayUnlike.findIndex((el) => el.id === action.payload.id);
      let countUnlike = arrayUnlike[idxUnlike]?.likes?.count;
      let userId = action.payload.user.id;
      let prevUnlike = arrayUnlike[idxUnlike]?.likes?.friends?.length
        ? arrayUnlike[idxUnlike]?.likes
          ?.friends?.filter((unlike) => unlike.user.id !== userId) : [];
      arrayUnlike[idxUnlike] = {
        ...arrayUnlike[idxUnlike],
        likes: {
          count: countUnlike - 1,
          friends: [
            ...prevUnlike,
          ]
        }
      };
      return {
        ...state,
        [targetUnlike]: arrayUnlike
      };

    default:
      return state;
  }
};
