import {
  DELETE_COMMENT,
  LIKE, REMOVE_POST, SET_COMMENTS, SET_POSTS_FOR_LENTA, SET_POSTS_USER, SET_POSTS_USER_OTHER, UNLIKE
} from '../constants/postsConstants';

const initialState = {
  userPosts: [],
  lentaPosts: [],
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
    case SET_POSTS_FOR_LENTA:
      return {
        ...state,
        lentaPosts: action.payload
      };
    case SET_POSTS_USER_OTHER:
      return {
        ...state,
        otherUserPosts: action.payload
      };
    case LIKE:
      let targetLike = action.payload?.lenta ? 'lentaPosts' : action.payload?.my ? 'userPosts' : 'otherUserPosts';
      let array = [...state[targetLike]];
      let idx = array.findIndex((el) => el.id === action.payload.id);
      let countLike = array[idx]?.likes?.count ? array[idx]?.likes?.count : 0;
      let friends = array[idx]?.likes?.friends?.length ? array[idx]?.likes?.friends : [];
      array[idx] = {
        ...array[idx],
        likes: {
          friends: action.payload?.lenta || !action.payload?.my
            ? [...friends, { user: action.payload.user }]
            : [...friends],
          count: countLike + 1,
          liked: true
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
      let targetUnlike = action.payload?.lenta ? 'lentaPosts' : action.payload?.my ? 'userPosts' : 'otherUserPosts';
      let arrayUnlike = [...state[targetUnlike]];
      let idxUnlike = arrayUnlike.findIndex((el) => el.id === action.payload.id);
      let countUnlike = arrayUnlike[idxUnlike]?.likes?.count;
      let friendsUnlike = arrayUnlike[idxUnlike]
        ?.likes?.friends?.length ? arrayUnlike[idxUnlike]?.likes?.friends : [];
      let find = friendsUnlike
        ?.find((likeFr) => likeFr.user.id === action.payload?.user?.id);
      arrayUnlike[idxUnlike] = {
        ...arrayUnlike[idxUnlike],
        likes: {
          friends: action.payload?.lenta || !action.payload?.my
            ? [...friendsUnlike.filter((likeFilter) => likeFilter?.user.id !== find?.user?.id)]
            : friendsUnlike,
          count: countUnlike - 1,
          liked: false
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
