import React from 'react';
import { ScrollView, Text, View } from 'native-base';
import { Platform } from 'react-native';
import { FriendsImageEmpty } from '../../styles/friends';
import { COLORS } from '../../functions/constants';
import AuthButton from '../Shared/AuthButton';
import { goToAddPost } from '../../functions/helpers';

function EmptyPost({ variant = 1 }) {
  return (
    <View
      alignItems="center"
      height="100%"
      mt="30px"
      minH="500px"
      flexGrow={1}
    >
      <FriendsImageEmpty
        resizeMode="cover"
        source={variant === 1 ? require('../../assets/images/icons/posts/emptyLenta.png')
          : require('../../assets/images/icons/posts/emptyPosts.png')}
      />
      <Text color={COLORS.black} fontFamily="NunitoBold" marginTop="14px" fontWeight="bold" fontSize="18px" lineHeight="25px">Здесь так пустынно...</Text>
      <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">Оживи эту ленту свом постом!</Text>
      <AuthButton
        style={{
          zIndex: 999, display: 'flex', width: 172, marginTop: 40, flex: 0
        }}
        variant="small"
        bxShadow={Platform.OS === 'ios'}
        active
        onPress={goToAddPost}
        text="Создать пост"
      />
    </View>
  );
}

export default EmptyPost;
