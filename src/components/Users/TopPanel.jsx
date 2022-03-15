import React from 'react';
import {
  Avatar, Box, HStack, Text
} from 'native-base';
import { useSelector } from 'react-redux';
import { TopPanelContainer } from '../../styles/users';
import {
  SharedButton
} from '../index';

function TopPanel() {
  const { oneUser } = useSelector((state) => state.user);

  return (
    <TopPanelContainer>
      <HStack space={3} alignItems="center" marginBottom={15}>
        <Avatar
          bg="#C4C4C4"
          size="64px"
          source={oneUser?.avatar ? { uri: `https://${oneUser?.avatar}` } : require('../../assets/images/icons/profile/avatar.png')}
        />
        <HStack alignItems="center">
          <Box paddingRight="22.5px" paddingLeft="22.5px">
            <Text fontSize={15} fontWeight="bold" textAlign="center">0</Text>
            <Text fontSize={13} textAlign="center">друзей</Text>
          </Box>
          <Box paddingRight="22.5px" paddingLeft="22.5px">
            <Text fontSize={15} fontWeight="bold" textAlign="center">0</Text>
            <Text fontSize={13} textAlign="center">постов</Text>
          </Box>
          <Box paddingRight="22.5px" paddingLeft="22.5px">
            <Text fontSize={15} fontWeight="bold" textAlign="center">0</Text>
            <Text fontSize={13} textAlign="center">заявок</Text>
          </Box>
        </HStack>
      </HStack>
      <SharedButton
        textStyle={{ fontSize: 15, lineHeight: 21 }}
        flex={false}
        style={{
          width: '100%', maxWidth: 335, height: 36
        }}
      >
        Добавить в друзья
      </SharedButton>

    </TopPanelContainer>
  );
}

export default TopPanel;
