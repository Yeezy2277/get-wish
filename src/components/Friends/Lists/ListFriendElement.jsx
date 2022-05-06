import React from 'react';
import {
  Avatar, Box, HStack, Image, Pressable, Text, FlatList
} from 'native-base';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../functions/constants';
import { SharedButton } from '../../index';
import { cancelRequest, sendRequest } from '../../../redux/actions/userActions';
import { userCRUD } from '../../../http/CRUD';
import { changeUserInfo } from '../../../redux/actions/authActions';
import { goToUserProfile, toastConfig } from '../../../functions/helpers';

function ListFriendElement({
  data, add, handleSearchPanel, handlePress, first = false
}) {
  const { search } = useSelector((state) => state.user);

  const handleGoToUser = async (item) => {
    const user = await userCRUD.get(item?.id);
    await changeUserInfo('oneUser', user?.data);
    if (search) {
      await goToUserProfile();
      const close = await handleSearchPanel();
      await close(false);
    } else {
      await goToUserProfile({ noSearch: true });
    }
  };
  return (
    <FlatList
      style={{
        marginBottom: first ? 30 : 100,
        paddingLeft: 20,
        paddingRight: 20,
        flexGrow: first ? 0 : 1,
        zIndex: -1
      }}
      zIndex={9}
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
            <Pressable onPress={() => handleGoToUser(item, add)} flex={1} display="flex" alignItems="center" flexDirection="row">
              <Avatar
                size="40px"
                source={item?.avatar ? {
                  uri: `${item?.avatar}`
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
            {item?.sendRequest ? (
              <SharedButton
                textStyle={{ fontSize: 14, lineHeight: 19 }}
                flex={false}
                onPress={() => cancelRequest(item.id)}
                style={{
                  width: 138, marginLeft: 'auto', maxWidth: 138, height: 30
                }}
              >
                Отменить запрос
              </SharedButton>
            ) : (
              <Pressable
                width="30px"
                height="30px"
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
            )}
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ListFriendElement;
