import React from 'react';
import { Text } from 'native-base';
import { useDispatch } from 'react-redux';
import { WishListTabBarContainer } from '../../styles/shared';
import { COLORS } from '../../functions/constants';
import { SET_TYPE_SEARCH } from '../../redux/constants/userConstants';

function WishListTabBar({
  active, jumpTo, index, title
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

export default WishListTabBar;
