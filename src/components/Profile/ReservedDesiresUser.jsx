import React from 'react';
import { HStack, Image, Pressable } from 'native-base';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  ReservedDesiresUserContainer,
  ReservedDesiresUserSubTitle,
  ReservedDesiresUserTitle
} from '../../styles/profile';
import { goToUserWishLists } from '../../functions/helpers';
import { ActionSheets } from '../../functions/ActionSheet';

function ReservedDesiresUser() {
  const { showActionSheetWithOptions } = useActionSheet();
  const state = new ActionSheets(showActionSheetWithOptions);
  return (
    <Pressable onPress={goToUserWishLists}>
      <ReservedDesiresUserContainer
        imageStyle={{ borderRadius: 10 }}
        resizeMode="cover"
        source={require('../../assets/images/icons/users/theme.png')}
      >
        <HStack justifyContent="space-between" width="100%">
          <ReservedDesiresUserTitle>🎄 Новый год</ReservedDesiresUserTitle>
          <Pressable onPress={() => state.showShareAction()} height="20px" width="10px">
            <Image source={require('../../assets/images/icons/profile/desires/menu.png')} height="15px" width="3px" />
          </Pressable>
        </HStack>
        <ReservedDesiresUserSubTitle>11 желаний</ReservedDesiresUserSubTitle>
        <HStack marginTop="15px" space={5} alignSelf="flex-start">
          <Image borderRadius={10} size={68} source={require('../../assets/images/icons/profile/desires/example1.png')} />
          <Image borderRadius={10} size={68} source={require('../../assets/images/icons/profile/desires/example1.png')} />
          <Image borderRadius={10} size={68} source={require('../../assets/images/icons/profile/desires/example1.png')} />
          <Image borderRadius={10} size={68} source={require('../../assets/images/icons/profile/desires/example1.png')} />
        </HStack>
      </ReservedDesiresUserContainer>
    </Pressable>
  );
}
export default ReservedDesiresUser;
