import {
  HStack, Image, Text, View
} from 'native-base';
import React from 'react';
import {
  View as ViewOriginal, Image as ImageOriginal, Text as TextOriginal, Platform
} from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo';
import NavigationService, { navigateAction, navigationRef } from './NavigationService';
import { COLORS } from './constants';
import MyPost from '../screens/Posts/MyPost';
import {getFriends, getOneUser} from '../redux/actions/userActions';
import { userCRUD } from '../http/CRUD';
import { changeUserInfo } from '../redux/actions/authActions';

export function goToStart() {
  NavigationService.navigate('Start');
}

export function goToMain() {
  navigateAction('MainProfile');
}

export function goToUserProfile(params) {
  navigateAction('UserProfile', params);
}

export function goToUserWishLists(params) {
  navigateAction('UserWishList', params);
}

export function goToUserPost() {
  navigateAction('UserPost');
}

export function goToPostsUser() {
  navigateAction('PostsUser');
}

export function goToShareScreen(props) {
  navigateAction('ShareScreen', props);
}

export function goToArchive() {
  navigateAction('ArchiveWishList');
}

export function goToWishList(props) {
  navigateAction('WishList', props);
}

export function goToAddPost(props) {
  navigateAction('AddPost', props);
}

export function goToAddWishList(props) {
  navigateAction('AddWishList', props);
}

export function goToMyPost(props) {
  navigateAction('MyPost', props);
}

export function goToUserPostOther(props) {
  navigateAction('UserPostOther', props);
}

export function goToSwiper(props) {
  navigateAction('Swiper', props);
}

export function goToComments(props) {
  navigateAction('Comments', props);
}

export function goToAddWish(props) {
  navigateAction('AddWish', props);
}

export function goToReservWishList(props) {
  navigateAction('ReservWishList', props);
}

export function goToLikes(props) {
  navigateAction('Likes', props);
}

export function goBack() {
  navigationRef.current.goBack();
}

export const goToShare = (showActionSheetWithOptions) => {
  return () => {
    showActionSheetWithOptions({
      options: ['Отмена', 'Поделиться'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
      }
    });
  };
};

export function declOfNum(number, words) {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

export const toastConfig = {
  search: ({ text1 }) => (
    <View
      zIndex={999999}
      style={{ elevation: 3 }}
      shadow={1}
      height="50px"
      maxWidth="335px"
      width="100%"
      paddingLeft="14px"
      marginRight="10px"
      marginLeft="10px"
      borderRadius="10px"
      backgroundColor={COLORS.white2}
    >
      <HStack height="100%" alignItems="center">
        <Image resizeMode="cover" size="22px" source={require('../assets/images/icons/check.png')} />
        <Text marginLeft="12px" fontWeight="bold" fontSize="15px">{text1}</Text>
      </HStack>
    </View>
  )
};

export const toastConfigWithoutNativeBase = {
  search: ({ text1 }) => (
    <ViewOriginal
      style={{
        height: 50,
        maxWidth: 335,
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        borderRadius: 10,
        backgroundColor: COLORS.white2,
        zIndex: 999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 5
      }}
    >
      <ImageOriginal resizeMode="cover" style={{ height: 22, width: 22 }} source={require('../assets/images/icons/check.png')} />
      <TextOriginal style={{ marginLeft: 12, fontWeight: 'bold', fontSize: 15 }}>{text1}</TextOriginal>
    </ViewOriginal>
  )
};

export const manipulateImage = async (image) => {
  const manipResult = await manipulateAsync(
    image.localUri || image.uri,
    [],
    { compress: 0.5, format: SaveFormat.JPEG }
  );
  return manipResult;
};

export const filterImages = (checkedItems, setCheckedItems, id, uri, duration) => {
  if (checkedItems.find((el) => el.id === id)) {
    if (checkedItems.length === 1) {
      setCheckedItems([]);
    } else {
      let array = [...checkedItems];
      let index = array.findIndex((find) => find.id === id);
      let beforeElements = array.slice(0, index);
      let afterElements = array.slice(index + 1, array.length);
      if (afterElements.length) {
        afterElements = afterElements.map((after) => ({ ...after, idx: after.idx - 1 }));
      }
      setCheckedItems([...beforeElements, ...afterElements]);
    }
  } else {
    if (checkedItems.length > 4) return;
    let idx;
    if (checkedItems.length === 0) {
      idx = 1;
    } else {
      let lastIdx = checkedItems[checkedItems.length - 1].idx;
      idx = lastIdx + 1;
    }
    setCheckedItems(((prevState) => [...prevState, {
      id, uri, idx, duration
    }]));
  }
};

export const findVideoFromStore = async (images, id) => {
  const res = await MediaLibrary.getAssetInfoAsync(images.find((el) => el.uri === id).id);
  if (Platform.OS === 'ios') {
    return res.localUri;
  }
  return res.uri;
};

export const findVideoOrImageByStore = async (id) => {
  const res = await MediaLibrary.getAssetInfoAsync(id);
  return res;
};

export const covertToBlob = async (uri) => {
  return new Promise(((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network error'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  }));
};

export const parsingUserTag = async (description) => {
  let newDesc = description;
  const tags = newDesc?.match(/<(.*?)>/gm);
  let users = [];
  let usersUnique = [];
  if (tags?.length) {
    for await (const tag of tags) {
      let id = tag.split('@')[1].split('>')[0];
      let { data: dataTag } = await getOneUser(id);
      users.push({ username: dataTag.username, id: dataTag.id });
    }
    users.filter((item) => {
      if (!usersUnique.some((element) => element.id === item.id)) {
        usersUnique.push(item);
      }
    });
    tags.forEach((el) => {
      let object = usersUnique.find((unique) => unique.id === +el.split('@')[1].split('>')[0]);
      newDesc = newDesc.replace(el, `@${object.username}`);
    });
  }
  return { description: newDesc, users: usersUnique };
};

export const handleGoToUser = async (id) => {
  const user = await userCRUD.get(id);
  await changeUserInfo('oneUser', user?.data);
  await goToUserProfile({ noSearch: true });
};

export const isVideo = (uri) => {
  if (typeof uri === 'string') {
    if (uri.toLowerCase()?.includes('.mp4')
        || uri.toLowerCase()?.includes('.mov') || uri.toLowerCase()?.includes('.avi')) {
      return true;
    }
  }
  return false;
};

export const parseTags = async (text) => {
  let friends = [];
  let friendsUnique = [];
  let desc = text;
  let users = desc.match(/\@[a-zA-Z]*/gm);
  if (users?.length) {
    for await (let user of users) {
      if (user?.split('@')?.length > 1) {
        const { data: dataFriendsTag } = await getFriends(user?.split('@')[1], false);
        dataFriendsTag?.forEach((friend) => {
          if (friend.username === user.split('@')[1]) {
            friends.push({ name: friend.username, id: friend.id });
          }
        });
      }
    }
    friends?.filter((item) => {
      if (!friendsUnique.some((element) => element.id === item.id)) {
        friendsUnique.push(item);
      }
    });
    users?.forEach((el) => {
      let object = friendsUnique.find((unique) => unique.name === el.split('@')[1]);
      if (object?.id)
        desc = desc?.replace(el, `<@${object?.id}>`);
    });
  }
  return desc
}
