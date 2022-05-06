import React from 'react';
import { ScrollView, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { COLORS } from '../../functions/constants';
import { FriendsContainerFirst, FriendsImageEmpty } from '../../styles/friends';
import AuthButton from '../Shared/AuthButton';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import ListQuery from './Lists/ListQuery';
import { getOutgoing } from '../../redux/actions/userActions';
import { declOfNum } from '../../functions/helpers';
import {useI18n} from "../../i18n/i18n";

function FriendsQuery({ empty = false }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const t = useI18n()
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getOutgoing().then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    const getData = async () => {
      await getOutgoing();
    };
    getData();
  }, []);
  const { outgoingRequest } = useSelector((state) => state.user);

  const all = React.useCallback(() => {
    return outgoingRequest
      ?.reduce((total, amount) => {
        if (!amount?.cancelRequest) {
          total += 1;
        }
        return total;
      }, 0);
  }, [outgoingRequest]);
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
        {!outgoingRequest?.length ? (
          <>
            <FriendsImageEmpty resizeMode="cover" source={require('../../assets/images/icons/friends/empty_query.png')} />
            <Text color={COLORS.black} marginTop="14px" fontFamily="NunitoBold" fontWeight="bold" fontSize="18px" lineHeight="25px">{t('friends_search')}</Text>
            <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">{t('friends_searchInfo')}</Text>
            <AuthButton
              style={{
                zIndex: 999, display: 'flex', width: 172, marginTop: 40
              }}
              onPress={openPanel}
              bxShadow
              variant="small"
              text={t('friends_find')}
            />
          </>
        ) : (
          <ListQuery
            title={`${all()} ${declOfNum(all(), t('friends_requestPlurals', {returnObjects: true}))}`}
            data={outgoingRequest}
          />
        )}

      </FriendsContainerFirst>
    </ScrollView>
  );
}

export default FriendsQuery;
