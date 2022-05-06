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
import {useI18n} from "../../i18n/i18n";

function FriendsFirst({ empty = true }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const t = useI18n()
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
  const { friends } = useSelector((state) => state.user);

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
            <Text color={COLORS.black} fontFamily="NunitoBold" marginTop="14px" fontWeight="bold" fontSize="18px" lineHeight="25px">{t('friends_noFriends')}</Text>
            <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">{t('friends_noFriendsInfo')}</Text>
            <AuthButton
              style={{
                zIndex: 999, display: 'flex', width: 172, marginTop: 40
              }}
              onPress={openPanel}
              variant="small"
              bxShadow
              text={t('friends_find')}
            />
          </>
        ) : <ListFriends title={`${friends?.length} ${declOfNum(friends?.length, t('friend_plurals', { returnObjects: true }))}`} data={friends} />}
      </FriendsContainerFirst>
    </ScrollView>
  );
}

export default FriendsFirst;
