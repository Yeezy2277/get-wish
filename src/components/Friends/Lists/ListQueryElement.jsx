import React from 'react';
import {
  Avatar, Box, HStack, Pressable, Text
} from 'native-base';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../functions/constants';
import { SharedButton } from '../../index';
import { cancelRequest, sendRequest } from '../../../redux/actions/userActions';
import { userCRUD } from '../../../http/CRUD';
import { changeUserInfo } from '../../../redux/actions/authActions';
import { goToUserProfile } from '../../../functions/helpers';

function ListQueryElement({ data, first = false, handleSearchPanel }) {
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
      data={data}
      style={{
        marginBottom: first ? 30 : 100, paddingLeft: 20, paddingRight: 20, flexGrow: first ? 0 : 1
      }}
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
                  uri: `${item?.avatar}`
                } : require('../../../assets/images/icons/profile/avatar.png')}
              />
              <Text
                marginLeft="10px"
                color={COLORS.black}
                fontSize="14px"
                fontWeight="600"
              >
                {item.username}
              </Text>
            </Pressable>
            {item?.cancelRequest ? <SharedButton onPress={() => sendRequest(item.id, first ? 'SEARCH' : 'QUERY')} style={{ width: 150, maxWidth: 150, marginLeft: 'auto' }}>Добавить в друзья</SharedButton>
              : <SharedButton onPress={() => cancelRequest(item.id, first ? 'SEARCH_OUT' : 'QUERY')} style={{ width: 138, maxWidth: 138, marginLeft: 'auto' }}>Отменить запрос</SharedButton>}
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ListQueryElement;
