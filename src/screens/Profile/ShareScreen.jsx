import React from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import { Box, Button, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShareScreenButtonPanel
} from '../../styles/profile';
import { FlexContainer } from '../../styles/main';
import {
  ListFriendsCheck, SearchHeader
} from '../../components';
import AuthButton from '../../components/Shared/AuthButton';
import { COLORS } from '../../functions/constants';
import { getFriends } from '../../redux/actions/userActions';
import { SET_TYPE_SEARCH } from '../../redux/constants/userConstants';
import { HANDLE_SELECTED_FRIENDS } from '../../redux/constants/wishListConstants';
import { goBack } from '../../functions/helpers';
import { ShareContext } from '../../functions/context';
import SearchHeaderShare from '../../components/Header/SearchHeaderShare';
import {useI18n} from "../../i18n/i18n";

function ShareScreen({ navigation, ...params }) {
  const isChooseFriend = React.useMemo(() => params?.route?.params?.chooseFriend, [params?.route]);
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const { selectedFriends: selectedFriendsRedux } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      if (!isChooseFriend) {
        parent.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    };
  }, [isChooseFriend, navigation, params]);

  const t = useI18n()

  React.useEffect(() => {
    const getData = async () => {
      await getFriends();
    };
    dispatch({
      type: SET_TYPE_SEARCH,
      payload: 'share'
    });
    if (selectedFriendsRedux?.length) {
      setSelectedFriends([...selectedFriendsRedux]);
    }
    getData();
  }, [dispatch, selectedFriendsRedux]);

  const { friends } = useSelector((state) => state.user);

  const onChangeCheckBoxTrue = () => {
    const ids = friends?.map((el) => el.id);
    if (ids.length) {
      setSelectedFriends([...ids]);
    }
  };

  const onChangeCheckBoxFalse = () => {
    setSelectedFriends([]);
  };

  const isDisabled = !selectedFriends.length;

  const handleSelectedFriends = () => {
    if (!isDisabled) {
      dispatch({
        type: HANDLE_SELECTED_FRIENDS,
        payload: selectedFriends
      });
      goBack();
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch({
        type: SET_TYPE_SEARCH,
        payload: 'friend'
      });
    };
  }, []);


  const SearchHeaderMemo = React.useMemo(() => {
    return (
      <SearchHeaderShare
        cancel
        setSelectedFriends={setSelectedFriends}
        selectedFriends={selectedFriends}
        title={isChooseFriend ? t('share_friends') : t('share_recipients')}
      />
    );
  }, [setSelectedFriends, selectedFriends]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
      {SearchHeaderMemo}
      <FlexContainer>
        <ShareScreenButtonPanel>
          <Button
            style={{
              backgroundColor: COLORS.white, borderRadius: 10, flex: 1, marginRight: 10
            }}
            _text={{
              color: '#8424FF'
            }}
            isDisabled={!friends?.length}
            onPress={onChangeCheckBoxTrue}
          >
            Выбрать всех
          </Button>
          <Button
            isDisabled={isDisabled}
            style={{ backgroundColor: COLORS.white, borderRadius: 10, flex: 1 }}
            _text={{
              color: !isDisabled ? '#8424FF' : '#C8CCE1'
            }}
            onPress={onChangeCheckBoxFalse}
          >
            Снять выбор
          </Button>
        </ShareScreenButtonPanel>
        <ShareContext.Provider value={{ setSelectedFriends, selectedFriends }}>
          <ListFriendsCheck
            data={friends}
          />
        </ShareContext.Provider>
        {selectedFriends.length ? (
          <AuthButton
            onPress={handleSelectedFriends}
            style={{ marginBottom: 20, height: 50 }}
            higlightStyle={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
            active={!isDisabled}
          >
            <Box display="flex" height="53px" alignItems="center" flexDirection="row">
              <Text marginRight="10px" fontSize={16} lineHeight={Platform.OS === 'android' ? 20 : 0} fontFamily="NunitoBold" color={COLORS.white}>Сохранить выбор</Text>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                size={22}
                color={COLORS.purple}
                borderRadius={11}
                backgroundColor={COLORS.white}
              >
                <Text fontSize={13} fontFamily="NunitoBold" color={COLORS.purple}>{selectedFriends.length}</Text>
              </Box>
            </Box>
          </AuthButton>
        ) : null}
      </FlexContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2
  }
});

export default ShareScreen;
