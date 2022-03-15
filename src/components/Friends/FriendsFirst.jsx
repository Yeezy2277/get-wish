import React from 'react';
import { View, Spinner, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { COLORS } from '../../functions/constants';
import { FriendsContainerFirst, FriendsImageEmpty } from '../../styles/friends';
import AuthButton from '../Shared/AuthButton';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import { ListFriends } from '../index';

function FriendsFirst({ empty = true }) {

  const openPanel = async () => {
    await searchPanelHandler(true);
  };
  const { loading, users } = useSelector((state) => state.user);

  return (
    <View height="100%" width="100%" paddingTop={empty ? '30px' : '20px'} backgroundColor={COLORS.white2}>
      <FriendsContainerFirst>
        {empty ? (
          <>
            <FriendsImageEmpty resizeMode="cover" source={require('../../assets/images/icons/friends/empty_friends.png')} />
            <Text color={COLORS.black} marginTop="14px" fontWeight="bold" fontSize="18px" lineHeight="25px">Куда все подевались?</Text>
            <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">Кажется, ты ещё ни с кем не подружился</Text>
            <AuthButton
              style={{
                zIndex: 999, display: 'flex', width: 172, marginTop: 40
              }}
              onPress={openPanel}
              variant="small"
              text="Найти друзей"
            />
          </>
        ) : loading ? <Spinner color="indigo.500" size="lg" /> : users.length
          ? <ListFriends add title="Глобальный поиск" data={users} /> : (
            <Text
              marginLeft="20px"
              alignSelf="flex-start"
              fontSize="15px"
              color={COLORS.gray}
            >
              Ничего не найдено :(
            </Text>
          )}
      </FriendsContainerFirst>
    </View>
  );
}

export default FriendsFirst;
