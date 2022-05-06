import {
  HStack, Image, Text, View
} from 'native-base';
import React from 'react';
import { View as ViewOriginal, Image as ImageOriginal, Text as TextOriginal } from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import NavigationService, { navigateAction, navigationRef } from './NavigationService';
import { COLORS } from './constants';
import { generateBoxShadowStyle } from './index';

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

export function goToShareScreen(props) {
  navigateAction('ShareScreen', props);
}

export function goToArchive() {
  navigateAction('ArchiveWishList');
}

export function goToWishList(props) {
  navigateAction('WishList', props);
}

export function goToAddWishList(props) {
  navigateAction('AddWishList', props);
}

export function goToSwiper(props) {
  navigateAction('Swiper', props);
}

export function goToAddWish(props) {
  navigateAction('AddWish', props);
}

export function goToReservWishList(props) {
  navigateAction('ReservWishList', props);
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
