import { $authHost } from '../../http';
import store from '../index';
import {
  DELETE_COMMENT,
  LIKE, REMOVE_POST, SET_COMMENTS, SET_POSTS_FOR_LENTA, SET_POSTS_USER, SET_POSTS_USER_OTHER, UNLIKE
} from '../constants/postsConstants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import {dataURItoBlob} from "../../functions/helpers";
import {FileSystemSessionType} from "expo-file-system";

export const addNewPost = async (file, id) => {
  let token = `Bearer ${await AsyncStorage.getItem('token')}`;
  return new Promise((resolve) => {
    FileSystem.uploadAsync(`https://wish.dev39.ru/api/v1/post/attachment/upload`, file?.uri, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: 'application/json',
        Authorization: token
      },
      httpMethod: 'POST',
      fieldName: 'file',
      mimeType: file?.type,
      parameters: {
        ...(id && { id })
      },
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      sessionType: FileSystemSessionType.BACKGROUND,
    }).then((response) => {
      const answer = JSON.parse(response.body);
      resolve(answer.data.id)
    })
        .catch((error) => {
          console.log("Upload error " + error);
        });
  })
};

export const editPost = async (id, text) => {
  return new Promise((resolve, reject) => {
    $authHost.put(`/api/v1/post/${id}`, {
      id, text
    }).then((response) => {
      resolve(response.data);
    }).catch(((error) => reject(error)));
  });
};

export const getMyWishLists = async () => {
  const { user: { userInfo: { id } } } = store.getState();
  return new Promise((resolve) => {
    const res = $authHost.get(`/api/v1/user/${id}/posts?take=100`).then((reponse) => {
      store?.dispatch({ type: SET_POSTS_USER, payload: reponse?.data?.data });
    });
    resolve(res?.data);
  });
};

export const getPostsForLenta = async () => {
  return new Promise((resolve) => {
    const res = $authHost.get('/api/v1/post/list').then((reponse) => {
      store?.dispatch({ type: SET_POSTS_FOR_LENTA, payload: reponse?.data?.data });
    });
    resolve(res?.data);
  });
};

export const getOnePost = async (id) => {
  return new Promise((resolve) => {
    const res = $authHost.get(`/api/v1/post/${id}`);
    resolve(res);
  });
};

export const updatePost = async (id, text) => {
  return new Promise((resolve) => {
    const res = $authHost.put(`/api/v1/post/${id}`, {
      text
    });
    resolve(res);
  });
};

export const getUserPosts = async (id) => {
  return new Promise((resolve) => {
    const res = $authHost.get(`/api/v1/user/${id}/posts`).then((reponse) => {
      store?.dispatch({ type: SET_POSTS_USER_OTHER, payload: reponse?.data?.data });
    });
    resolve(res?.data);
  });
};

export const like = async (id, my, lenta) => {
  const { user: { userInfo } } = store.getState();
  return new Promise((resolve, reject) => {
    $authHost.post(`/api/v1/post/${id}/like`, {
      id
    }).then((response) => {
      store?.dispatch({
        type: LIKE,
        payload: {
          id, user: userInfo, my, lenta
        }
      });
      resolve(response.data);
    }).catch(((error) => reject(error)));
  });
};

export const unLike = async (id, my, lenta) => {
  const { user: { userInfo } } = store.getState();
  return new Promise((resolve, reject) => {
    $authHost.post(`/api/v1/post/${id}/unlike`, {
      id
    }).then((response) => {
      store?.dispatch({
        type: UNLIKE,
        payload: {
          id, user: userInfo, my, lenta
        }
      });
      resolve(response.data);
    }).catch(((error) => reject(error)));
  });
};

export const deletePost = async (id) => {
  return new Promise((resolve, reject) => {
    $authHost.delete(`/api/v1/post/${id}`, {
      id
    }).then((response) => {
      store?.dispatch({
        type: REMOVE_POST,
        payload: id
      });
      resolve(response.data);
    }).catch(((error) => reject(error)));
  });
};

export const sendComment = async (postId, text) => {
  const { posts: { comments } } = store.getState();
  return new Promise((resolve, reject) => {
    $authHost.post(`/api/v1/post/${postId}/comment`, {
      text
    }).then((response) => {
      store?.dispatch({ type: SET_COMMENTS, payload: [...comments, response.data.data] });
      resolve(response.data.data);
    }).catch(((error) => reject(error)));
  });
};

export const deleteComment = async (id) => {
  return new Promise((resolve, reject) => {
    $authHost.delete(`/api/v1/post/comment/${id}`).then((response) => {
      store?.dispatch({
        type: DELETE_COMMENT,
        payload: id
      });
      resolve(response.data);
    }).catch(((error) => reject(error)));
  });
};

export const getLikes = async (postId) => {
  return new Promise((resolve, reject) => {
    $authHost.get(`/api/v1/post/${postId}/likes`).then((response) => {
      resolve(response.data.data);
    }).catch(((error) => reject(error)));
  });
};

export const getComments = async (postId) => {
  return new Promise((resolve, reject) => {
    $authHost.get(`/api/v1/post/${postId}/comments`).then((response) => {
      store?.dispatch({ type: SET_COMMENTS, payload: response.data.data });
      resolve(response.data.data);
    }).catch(((error) => reject(error)));
  });
};
