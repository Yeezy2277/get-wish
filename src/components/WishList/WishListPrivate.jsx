import React from 'react';
import {
  Text, ScrollView, View, VStack, Fab, Image
} from 'native-base';
import { useSelector } from 'react-redux';
import { COLORS } from '../../functions/constants';
import { FriendsContainerFirst, FriendsImageEmpty } from '../../styles/friends';
import AuthButton from '../Shared/AuthButton';
import { goToAddWishList } from '../../functions/helpers';
import { filterWishList } from '../../redux/actions/wishListActions';
import ReservedDesiresUser from '../Profile/ReservedDesiresUser';
import useLoader from '../../hooks/useLoader';
import { Loader } from '../index';

function WishListPrivate({ empty = true }) {
  const { start, stop, loading } = useLoader(false);
  const { reloadValue } = useSelector((state) => state.generic);
  const { privateWishLists } = useSelector((state) => state.wishList);
  React.useEffect(() => {
    const getData = async () => {
      start();
      await filterWishList({ type: 2 });
      stop();
    };
    getData();
  }, [reloadValue]);
  return (
    <>
      <ScrollView
        height="100%"
        width="100%"
        paddingTop={!privateWishLists?.length ? '30px' : '15px'}
        backgroundColor={COLORS.white2}
      >
        <FriendsContainerFirst>
          {loading ? <Loader /> : !privateWishLists?.length ? (
            <>
              <FriendsImageEmpty resizeMode="cover" source={require('../../assets/images/icons/wishlist/private.png')} />
              <Text color={COLORS.black} fontFamily="NunitoBold" marginTop="14px" fontWeight="bold" fontSize="18px" lineHeight="25px">Нет приватных вишлистов</Text>
              <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">Тебе нечего скрывать!</Text>
              <AuthButton
                style={{
                  zIndex: 999, display: 'flex', width: 172, marginTop: 40
                }}
                onPress={goToAddWishList}
                variant="small"
                bxShadow
                active
                text="Создать вишлист"
              />
            </>
          ) : (
            <ScrollView marginBottom="40px" width="100%" height="100%" _contentContainerStyle={{ flex: 1 }}>
              <VStack space="10px" paddingRight="15px" paddingLeft="15px">
                {privateWishLists?.map((el) => {
                  return (
                    <ReservedDesiresUser
                      id={el.id}
                      el={el}
                      name={el.name}
                      key={el.id}
                      isInWishList
                    />
                  );
                })}
              </VStack>
            </ScrollView>
          )}
        </FriendsContainerFirst>
      </ScrollView>
      {privateWishLists?.length ? (
        <Fab
          onPress={goToAddWishList}
          renderInPortal={false}
          shadow={2}
          size="50px"
          backgroundColor={COLORS.purple}
          icon={(
            <Image
              size="20px"
              source={require('../../assets/images/icons/wishlist/plus.png')}
            />
              )}
        />
      ) : null}
    </>
  );
}

export default WishListPrivate;
