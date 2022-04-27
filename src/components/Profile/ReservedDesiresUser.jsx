import React from 'react';
import {
  HStack, Image, Pressable, Text
} from 'native-base';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Platform } from 'react-native';
import {
  ReservedDesiresUserContainer,
  ReservedDesiresUserSubTitle,
  ReservedDesiresUserTitle
} from '../../styles/profile';
import { declOfNum, goToUserWishLists } from '../../functions/helpers';
import { ActionSheets } from '../../functions/ActionSheet';
import { androidShadow } from '../../functions';

function ReservedDesiresUser({
  isInWishList, name, id, el
}) {
  const { showActionSheetWithOptions } = useActionSheet();
  const state = new ActionSheets(showActionSheetWithOptions);

  function RenderImage(wish) {
    if (wish) {
      // eslint-disable-next-line react/destructuring-assignment
      if (wish?.image) {
        return <Image borderRadius={10} size={68} source={{ uri: wish?.image }} />;
      }
      return <Image borderRadius={10} size={68} source={require('../../assets/images/icons/wishlist/noPhoto.png')} />;
    }
    return <Image borderRadius={10} size={68} source={require('../../assets/images/icons/profile/desires/placeholder.png')} />;
  }

  return (
    <Pressable
      shadow={1}
      onPress={async () => {
        goToUserWishLists({ id });
      }}
    >
      <ReservedDesiresUserContainer
        imageStyle={{ borderRadius: 10 }}
        resizeMode="cover"
        style={Platform.OS === 'android' && androidShadow}
        source={el?.preview ? { uri: el?.preview } : require('../../assets/images/icons/users/theme.png')}
      >
        <HStack justifyContent="space-between" width="100%">
          <ReservedDesiresUserTitle>
            <Text>{el?.theme?.symbol || '🎄'}</Text>
            {' '}
            {name || 'Новый год'}
          </ReservedDesiresUserTitle>
          <Pressable
            onPress={() => {
              if (!isInWishList) {
                state.showShareAction();
              } else {
                state.showShareActionInMyWishList(id, el);
              }
            }}
            height="20px"
            justifyContent="center"
            alignItems="center"
            width="20px"
          >
            <Image source={require('../../assets/images/icons/profile/desires/menu.png')} height="15px" width="3px" />
          </Pressable>
        </HStack>
        <ReservedDesiresUserSubTitle>
          {el?.wishes?.length}
          {' '}
          {declOfNum(
            el?.wishes?.length,
            ['желание', 'желания', 'желаний']
          )}
        </ReservedDesiresUserSubTitle>
        <HStack marginTop="15px" space={3} justifyContent="center">
          {RenderImage(el?.wishes[0])}
          {RenderImage(el?.wishes[1])}
          {RenderImage(el?.wishes[2])}
          {RenderImage(el?.wishes[3])}
        </HStack>
      </ReservedDesiresUserContainer>
    </Pressable>
  );
}
export default ReservedDesiresUser;
