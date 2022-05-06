import React from 'react';
import {
  Avatar, HStack, Image, Pressable, ScrollView, Text, VStack
} from 'native-base';
import { COLORS } from '../../functions/constants';

function UserPost() {
  return (
    <ScrollView backgroundColor={COLORS.white2} width="100%" height="100%">
      <HStack alignItems="center" paddingLeft="15px" paddingRight="15px" paddingTop="10px" paddingBottom="10px">
        <Avatar size="26px" source={require('../../assets/images/icons/profile/avatar.png')} />
        <Text marginLeft="10px" fontSize="16px" color={COLORS.black}>anastasia_efremova</Text>
        <Pressable marginLeft="auto" width="10px" height="20px" display="flex" justifyContent="center" alignItems="flex-end">
          <Image resizeMode="cover" width="3px" height="15px" source={require('../../assets/images/icons/profile/desires/menu.png')} />
        </Pressable>
      </HStack>
      <Image height="375px" width="100%" source={{ uri: 'https://www.youloveit.ru/uploads/posts/2016-09/1473331543_youloveit_ru_girly_m_devushki_kartinki11.jpg' }} />
      <HStack alignItems="center" space="19px" marginTop="12px" marginLeft="15px">
        <Image size="28px" source={require('../../assets/images/icons/users/post/like.png')} />
        <Image size="28px" source={require('../../assets/images/icons/users/post/comment.png')} />
        <Image size="28px" source={require('../../assets/images/icons/users/post/share.png')} />
      </HStack>
      <HStack alignItems="center" space="md" marginTop="10px" marginLeft="15px" marginRight="15px">
        <HStack>
          <Avatar zIndex={3} borderWidth={2} borderColor={COLORS.white2} size="20px" source={require('../../assets/images/icons/profile/desires/avatar1.png')} />
          <Avatar zIndex={2} marginLeft="-8px" borderWidth={2} borderColor={COLORS.white2} size="20px" source={require('../../assets/images/icons/profile/desires/avatar1.png')} />
          <Avatar zIndex={1} marginLeft="-8px" borderWidth={2} borderColor={COLORS.white2} size="20px" source={require('../../assets/images/icons/profile/desires/avatar1.png')} />
        </HStack>
        <VStack>
          <Text maxWidth="283px" fontSize="14px">
            <Text fontWeight="bold">anastasia_efremova</Text>
            {' '}
            Сбылась моя мечта! 🐶
          </Text>
          <Text fontSize="14px">
            Спасибо, любимый
            {' '}
            <Text color={COLORS.purple}>@roman_84</Text>
            {' '}
            💕
          </Text>
        </VStack>
      </HStack>
      <Text fontSize="14px" paddingLeft="15px" paddingRight="15px" width="100%" marginTop="10px">
        <Text fontWeight="bold">anastasia_efremova</Text>
        {' '}
        С другой стороны рамки и место обучения кадров
        в значительной степени обуславливает создание форм развития. Таким... ещё
      </Text>
    </ScrollView>
  );
}

export default UserPost;
