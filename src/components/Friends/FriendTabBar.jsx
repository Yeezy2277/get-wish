import React from 'react';
import { Text } from 'native-base';
import { FriendTabBarContainer, FriendTabBarImage } from '../../styles/shared';

function FriendTabBar({ active, jumpTo, index }) {
  return (
    <FriendTabBarContainer
      onPress={() => {
        jumpTo(index);
      }}
      active={active}
    >
      <FriendTabBarImage source={require('../../assets/images/icons/tabs/first.png')} />
      <Text>Друзья</Text>
    </FriendTabBarContainer>
  );
}

export default FriendTabBar;
