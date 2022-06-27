import React from 'react';
import {
  Avatar, Box, HStack, Pressable, Text, FlatList, ScrollView
} from 'native-base';
import { Dimensions } from 'react-native';
import { COLORS } from '../../functions/constants';
import useLoader from '../../hooks/useLoader';
import {
  getFriends
} from '../../redux/actions/userActions';

function PostListFriendElement({
  data, handleChooseUser, full2, first = false, full, top = "0px"
}) {
  const { width } = Dimensions.get('window');

  const handleAddUser = (item) => {
    handleChooseUser(item.username);
  };

  return (
    <ScrollView
      zIndex={9}
      position="absolute"
      left={0}
      right={0}
      backgroundColor={COLORS.white2}
      height={full2 ? '87%' : full ? '80%' : '194px'}
      width={width}
      top={top}
    >
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
              <Pressable onPress={() => handleAddUser(item)} flex={1} display="flex" alignItems="center" flexDirection="row">
                <Avatar
                  size="40px"
                  source={item?.avatar ? {
                    uri: `${item?.avatar}`
                  } : require('../../assets/images/icons/profile/avatar.png')}
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
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}

export default PostListFriendElement;
