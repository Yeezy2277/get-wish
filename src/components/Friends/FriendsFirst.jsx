import React from 'react';
import {
  View, Spinner, Text, ScrollView
} from 'native-base';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { COLORS } from '../../functions/constants';
import { FriendsContainerFirst, FriendsImageEmpty } from '../../styles/friends';
import AuthButton from '../Shared/AuthButton';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import { ListFriends } from '../index';
import { getFriends } from '../../redux/actions/userActions';
import { declOfNum } from '../../functions/helpers';

function FriendsFirst({ empty = true }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getFriends().then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    const getData = async () => {
      await getFriends();
    };
    getData();
  }, []);

  const openPanel = async () => {
    await searchPanelHandler(true);
  };
  const { loading, users, friends } = useSelector((state) => state.user);

  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
    )}
      height="100%"
      width="100%"
      paddingTop={!friends?.length ? '30px' : '20px'}
      backgroundColor={COLORS.white2}
    >
      <FriendsContainerFirst>
        {!friends?.length ? (
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
        ) : <ListFriends title={`${friends?.length} ${declOfNum(friends?.length, ['друг', 'друга', 'друзей'])}`} data={friends} />}
      </FriendsContainerFirst>
    </ScrollView>
  );
}

export default FriendsFirst;
