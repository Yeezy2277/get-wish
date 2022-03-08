import React from 'react';
import { Box, Text } from 'native-base';
import { FriendTabBarContainer, FriendTabBarImage } from '../../styles/shared';
import { COLORS } from '../../functions/constants';

function FriendTabBar({
  active, jumpTo, index, title, image, imageActive, notification
}) {
  const goTo = () => {
    jumpTo(index);
  };
  return (
    <FriendTabBarContainer
      onPress={goTo}
      active={active}
    >
      <FriendTabBarImage source={active ? imageActive : image} />
      <Text
        fontSize={14}
        fontWeight={700}
        color={active ? COLORS.purple : COLORS.black}
      >
        {title}
      </Text>
      {notification && (
      <Box
        backgroundColor={COLORS.notificationColor}
        width="6px"
        marginLeft={4.5}
        height="6px"
        borderRadius={3}
      />
      )}
    </FriendTabBarContainer>
  );
}

export default FriendTabBar;
