import React from 'react';
import {
  Box, FlatList, Avatar, HStack, Text, Heading, Image, Pressable, View
} from 'native-base';
import Toast from 'react-native-toast-message';
import { COLORS } from '../../../functions/constants';
import { goToUserProfile } from '../../../functions/helpers';
import { changeUserInfo } from '../../../redux/actions/authActions';
import { sendRequest } from '../../../redux/actions/userActions';

function ListFriends({
  title, data, add, handleSearchPanel
}) {
  const handlePress = async ({ id }) => {
    if (add) {
      await sendRequest(id).then(() => {
        Toast.show({
          type: 'search',
          text1: 'Запрос на дружбу отправлен',
          position: 'bottom',
        });
      });
    }
  };

  const handleGoToUser = async (item) => {
    await changeUserInfo('oneUser', item);
    await goToUserProfile();
    const close = await handleSearchPanel();
    await close(false);
  };

  return (
    <Box width="100%" paddingLeft="20px" paddingRight="20px">
      <Heading fontSize="15px" pb="19px" color={COLORS.gray}>
        { title || '5 друзей'}
      </Heading>
      <FlatList
        data={data}
        renderItem={({
          item
        }) => (
          <Box
            _dark={{
              borderColor: 'gray.600'
            }}
            pb="20px"
            borderColor="coolGray.200"
          >
            <HStack space={3} alignItems="center">
              <Pressable onPress={() => handleGoToUser(item)} display="flex" alignItems="center" flexDirection="row">
                <Avatar
                  size="40px"
                  source={item?.avatar ? {
                    uri: `https://${item?.avatar}`
                  } : require('../../../assets/images/icons/profile/avatar.png')}
                  marginRight="10px"
                />
                <Text
                  color={COLORS.black}
                  fontSize="14px"
                  fontWeight="600"
                >
                  {item.username}
                </Text>
              </Pressable>
              <Pressable
                width="21px"
                height="24px"
                marginLeft="auto"
                onPress={() => handlePress(item)}
              >
                <Image
                  resizeMode="contain"
                  width="21px"
                  height="24px"
                  source={add ? require('../../../assets/images/icons/friends/add.png') : require('../../../assets/images/icons/friends/chat.png')}
                />
              </Pressable>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />

    </Box>
  );
}

export default ListFriends;
