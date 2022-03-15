import {
  HStack, Image, Text, View
} from 'native-base';
import React from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import NavigationService, { navigateAction, navigationRef } from './NavigationService';
import { COLORS } from './constants';

export function goToStart() {
  NavigationService.navigate('Start');
}

export function goToMain() {
  navigateAction('MainProfile');
}

export function goToUserProfile() {
  navigateAction('UserProfile');
}

export function goToUserWishLists() {
  navigateAction('UserWishList');
}

export function goToUserPost() {
  navigateAction('UserPost');
}

export function goToShareScreen() {
  navigateAction('ShareScreen');
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

export const toastConfig = {
  search: ({ text1 }) => (
    <View
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
