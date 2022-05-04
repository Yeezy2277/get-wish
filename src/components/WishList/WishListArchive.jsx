import React from 'react';
import {
  Text, ScrollView, View, VStack
} from 'native-base';
import { useSelector } from 'react-redux';
import { COLORS } from '../../functions/constants';
import { FriendsContainerFirst, FriendsImageEmpty } from '../../styles/friends';
import ReservedDesiresUser from '../Profile/ReservedDesiresUser';
import { filterWishList } from '../../redux/actions/wishListActions';
import useLoader from '../../hooks/useLoader';
import { Loader } from '../index';

function WishListArchive() {
  const { start, stop, loading } = useLoader(false);
  const { reloadValue } = useSelector((state) => state.generic);
  const { archiveWishLists } = useSelector((state) => state.wishList);
  React.useEffect(() => {
    const getData = async () => {
      start();
      await filterWishList({ type: 3 });
      stop();
    };
    getData();
  }, [reloadValue]);
  return (
    <ScrollView
      height="100%"
      width="100%"
      paddingTop={!archiveWishLists?.length ? '76px' : '15px'}
      backgroundColor={COLORS.white2}
    >
      <FriendsContainerFirst>
        {loading ? <Loader /> : !archiveWishLists?.length ? (
          <>
            <FriendsImageEmpty resizeMode="cover" source={require('../../assets/images/icons/wishlist/archive_background.png')} />
            <Text color={COLORS.black} fontFamily="NunitoBold" marginTop="14px" fontWeight="bold" fontSize="18px" lineHeight="25px">Здесь пока пусто</Text>
            <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">Хотя, возможно, там кот...</Text>
          </>
        ) : (
          <ScrollView marginBottom="40px" width="100%" height="100%" _contentContainerStyle={{ flex: 1 }}>
            <VStack space="10px" paddingRight="15px" paddingLeft="15px">
              {archiveWishLists?.map((el) => {
                return (
                  <ReservedDesiresUser
                    id={el.id}
                    el={el}
                    name={el.name}
                    key={el.id}
                    archive
                    isInWishList
                  />
                );
              })}
            </VStack>
          </ScrollView>
        )}
      </FriendsContainerFirst>
    </ScrollView>
  );
}

export default WishListArchive;
