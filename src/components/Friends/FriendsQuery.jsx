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

function FriendsQuery({ empty = false }) {
  const [refreshing, setRefreshing] = React.useState(false);

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
            <Text color={COLORS.black} marginTop="14px" fontWeight="bold" fontSize="18px" lineHeight="25px">Трудно сделать первый шаг?</Text>
            <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">Решайся, это проще, чем кажется!</Text>
            <AuthButton
              style={{
                zIndex: 999, display: 'flex', width: 172, marginTop: 40
              }}
              onPress={openPanel}
              variant="small"
              text="Найти друзей"
            />
          </>
        ) : (
          <ListQuery
            title={`${all()} ${declOfNum(all(), ['запрос', 'запроса', 'запросов'])}`}
            data={outgoingRequest}
          />
        )}

      </FriendsContainerFirst>
    </ScrollView>
  );
}

export default FriendsQuery;
