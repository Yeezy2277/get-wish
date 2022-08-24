import React from 'react';
import { ScrollView, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { COLORS } from '../../functions/constants';
import { FriendsContainerFirst, FriendsImageEmpty } from '../../styles/friends';
import AuthButton from '../Shared/AuthButton';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import ListRequest from './Lists/ListRequest';
import { getIncoming } from '../../redux/actions/userActions';
import { declOfNum } from '../../functions/helpers';
import {useI18n} from "../../i18n/i18n";

function FriendsRequest({ empty = false }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const t = useI18n()
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getIncoming().then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    const getData = async () => {
      await getIncoming();
    };
    getData();
  }, []);
  const { incomingRequest } = useSelector((state) => state.user);

  const all = React.useCallback(() => {
    return incomingRequest
      ?.reduce((total, amount) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!amount.hasOwnProperty('status')) {
          total += 1;
        }
        return total;
      }, 0);
  }, [incomingRequest]);

  const openPanel = async () => {
    await searchPanelHandler(true);
  };
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
      paddingTop={empty ? '30px' : '20px'}
      backgroundColor={COLORS.white2}
    >
      <FriendsContainerFirst>
        {!incomingRequest?.length ? (
          <>
            <FriendsImageEmpty resizeMode="cover" source={require('../../assets/images/icons/friends/empty_request.png')} />
            <Text color={COLORS.black} marginTop="14px" fontFamily="NunitoBold" fontWeight="bold" fontSize="18px" lineHeight="25px">{t('friends_requests')}</Text>
            <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">{t('friends_requestsInfo')}</Text>
            <AuthButton
              style={{
                zIndex: 999, display: 'flex', width: 172, marginTop: 40
              }}
              onPress={openPanel}
              bxShadow
              variant="small"
              text={t('friends_callFriends')}
            />
          </>
        ) : (
          <ListRequest
            title={`${all()} ${declOfNum(all(), t('friends_outcomingRequestPlurals', {returnObjects: true}))}`}
            data={incomingRequest}
          />
        )}
      </FriendsContainerFirst>
    </ScrollView>
  );
}

export default FriendsRequest;
