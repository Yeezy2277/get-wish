import React from 'react';
import { Text } from 'native-base';
import { WishListTabBarContainer } from '../../styles/shared';
import { COLORS } from '../../functions/constants';

function PostsTabBar({
  active, jumpTo, index, title
}) {
  const goTo = () => {
    jumpTo(index);
  };
  return (
    <WishListTabBarContainer
      onPress={goTo}
      active={active}
    >
      <Text
        fontSize={14}
        fontWeight={700}
        color={active ? COLORS.purple : COLORS.black}
      >
        {title}
      </Text>
    </WishListTabBarContainer>
  );
}

export default PostsTabBar;
