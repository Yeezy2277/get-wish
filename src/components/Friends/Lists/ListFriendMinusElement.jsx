import React from 'react';
import {
  Avatar, Text, FlatList, HStack, Pressable, Image
} from 'native-base';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLORS } from '../../../functions/constants';
import {useI18n} from "../../../i18n/i18n";

function SwipebleELement({ item, deleteFriendFromLocalHandler }) {
  const [swipeable, setSwipeable] = React.useState(false);
  const onSwipeableWillOpenHandler = () => {
    setSwipeable(true);
  };
  const onSwipeableWillCloseHandler = () => {
    setSwipeable(false);
  };
  return (
    <Swipeable
      enableTrackpadTwoFingerGesture
      onSwipeableWillClose={onSwipeableWillCloseHandler}
      onSwipeableWillOpen={onSwipeableWillOpenHandler}
      renderRightActions={() => RightElement({ item, deleteFriendFromLocalHandler })}
    >
      <HStack
        _dark={{
          borderColor: 'gray.600'
        }}
        alignItems="center"
        width="100%"
        backgroundColor={swipeable ? COLORS.extralightGray : COLORS.transparent}
        mb="2px"
        height="48px"
        borderColor="coolGray.200"
      >
        <Pressable size="20px" marginRight="14px" onPress={() => deleteFriendFromLocalHandler(item.id)}>
          <Image
            size="20px"
            source={require('../../../assets/images/icons/wishlist/add/minus.png')}
          />
        </Pressable>

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
      </HStack>
    </Swipeable>
  );
}

function RightElement({ item, deleteFriendFromLocalHandler }) {
  const handlePressDelete = () => {
    deleteFriendFromLocalHandler(item.id);
  };
  const t = useI18n()
  return (
    <Pressable
      onPress={handlePressDelete}
      width="86px"
      justifyContent="center"
      alignItems="center"
      backgroundColor={COLORS.red}
      height="48px"
    >
      <Text fontSize="15px" fontFamily="NunitoBold" color={COLORS.white}>{t('delete')}</Text>
    </Pressable>
  );
}

function ListFriendMinusElement({
  data, deleteFriendFromLocalHandler
}) {
  return (
    <FlatList
      style={{
        width: '100%',
        zIndex: -1
      }}
      marginTop="15px"
      zIndex={9}
      data={data}
      renderItem={({
        item
      }) => (
        <SwipebleELement deleteFriendFromLocalHandler={deleteFriendFromLocalHandler} item={item} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ListFriendMinusElement;
