import React from 'react';
import {
  Box, ScrollView, Text, VStack
} from 'native-base';
import { useSelector } from 'react-redux';
import ReservedDesiresUser from '../Profile/ReservedDesiresUser';
import { PrivateAccount } from '../index';
import { filterWishList, getWishListUser } from '../../redux/actions/wishListActions';
import useLoader from '../../hooks/useLoader';
import { COLORS } from '../../functions/constants';

function DesiresUser() {
  const { oneUser } = useSelector((state) => state.user);
  const { reloadValue } = useSelector((state) => state.generic);
  const { start, stop } = useLoader(false);
  const { userWishLists } = useSelector((state) => state.wishList);
  React.useEffect(() => {
    const getData = async () => {
      start();
      await getWishListUser({ userId: oneUser?.id });
      stop();
    };
    getData();
  }, [reloadValue]);
  return (
    <ScrollView>
      {(oneUser?.private && !oneUser?.is_friend) ? (
        <PrivateAccount />
      )
        : (
          <VStack paddingBottom="300px" paddingRight="15px" paddingLeft="15px" marginTop="15px">
            {userWishLists?.length ? userWishLists?.map((el) => {
              return (
                <ReservedDesiresUser
                  el={el}
                  id={el.id}
                  name={el.name}
                  key={el.id}
                  isInWishList
                />
              );
            }) : (
              <Box marginTop="40%">
                <Text textAlign="center" fontSize={18} color={COLORS.black}>Здесь пока пусто</Text>
                <Text marginTop="11px" alignSelf="center" maxWidth="200px" textAlign="center" fontSize={14} color={COLORS.gray}>
                  Пользователь ещё не сделал
                  ни одной публикации
                </Text>
              </Box>
            )}
          </VStack>
        )}
    </ScrollView>

  );
}

export default DesiresUser;
