import React from 'react';
import { Box, Text } from 'native-base';
import { useDispatch } from 'react-redux';
import { FriendTabBarContainer, FriendTabBarImage } from '../../styles/shared';
import { COLORS } from '../../functions/constants';
import { SET_TYPE_SEARCH } from '../../redux/constants/userConstants';

function FriendTabBar({
  active, jumpTo, index, title, image, imageActive, notification
}) {
  const dispatch = useDispatch();
  const goTo = () => {
    dispatch({
      type: SET_TYPE_SEARCH,
      payload: index
    });
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
