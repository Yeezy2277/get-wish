import React from 'react';
import {
  View,
  ScrollView
} from 'native-base';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { COLORS } from '../../functions/constants';
import { DesiresScreenRow } from '../../styles/profile';
import { DesiresScreenElement, Loader } from '../../components';
import Header from '../../components/Header/Header';
import useLoader from '../../hooks/useLoader';
import { getUserReservedList } from '../../redux/actions/wishListActions';

function ReservWishList({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const { start, stop, loading } = useLoader(false);
  const [showTutorial, setShowTutorial] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getUserReservedList().then(() => setRefreshing(false));
  }, []);
  const { reloadValue } = useSelector((state) => state.generic);
  const { reservedWishList } = useSelector((state) => state.user);

  React.useEffect(() => {
    (async function load() {
      start();
      await getUserReservedList();
      stop();
    }());
  }, [reloadValue]);

  return (
    <>
      {loading ? <Loader /> : (
        <View
          backgroundColor={COLORS.white2}
          style={{
            width: '100%',
            position: 'relative',
            height: '100%',
          }}
        >
          <Header
            cancel
            title="Зарезервированные желания"
            navigation={navigation}
          />
          <ScrollView
            display="flex"
            scrollEventThrottle={17}
            width="100%"
            height="100%"
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )}
          >
            <DesiresScreenRow>
              {reservedWishList?.map((el) => {
                return (
                  <DesiresScreenElement
                    showTutorial={showTutorial}
                    friend
                    isYourWishList={false}
                    el={el}
                    key={el.id}
                    reserved
                    setShowTutorial={setShowTutorial}
                  />
                );
              })}
            </DesiresScreenRow>
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default ReservWishList;
