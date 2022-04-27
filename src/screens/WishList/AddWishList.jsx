import React from 'react';
import {
  Box,
  Image, Spinner, Text, View
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import { WishListContainer, WishListPrivateText } from '../../styles/wishlist';
import ChooseTheme from './Add/ChooseTheme';
import { COLORS } from '../../functions/constants';
import InputText from '../../components/Inputs/InputText';
import { ProfilePrivateText } from '../../styles/profile';
import {
  FormGroupContainer, FormGroupElementSwitch, FormGroupSwitch, FormGroupTextSwitch
} from '../../styles/shared';
import AuthButton from '../../components/Shared/AuthButton';
import { goBack, goToShareScreen, goToWishList } from '../../functions/helpers';
import { ListFriendsMinus, Loader } from '../../components';
import { getFriends } from '../../redux/actions/userActions';
import useLoader from '../../hooks/useLoader';
import { HANDLE_DELETED_SELECTED_FRIENDS, HANDLE_SELECTED_FRIENDS } from '../../redux/constants/wishListConstants';
import { createWishList, getThemes } from '../../redux/actions/wishListActions';
import { wishlistCRUD } from '../../http/CRUD';
import { reload } from '../../redux/actions/genericActions';
import { setWishListAdded } from '../../redux/actions/wishActions';

function AddWishList({ navigation, ...props }) {
  const { start, stop, loading } = useLoader(false);
  const { start: start2, stop: stop2, loading: loading2 } = useLoader(false);
  const [active, setActive] = React.useState(1);
  const [name, setName] = React.useState('');
  const [privateWishList, setPrivate] = React.useState(false);
  const { selectedFriends, themes } = useSelector((state) => state.wishList);
  const { addedWishId } = useSelector((state) => state.wish);
  const [selectedFriendsLocal, setSelectedFriendsLocal] = React.useState([]);
  const dispatch = useDispatch();

  const id = React.useMemo(() => props?.route?.params?.id, [props?.route?.params?.id]);
  const isEdit = !!id;

  React.useEffect(() => {
    (async function () {
      start2();
      try {
        const theme = await getThemes();
        setActive(theme[0]?.id);
        if (isEdit) {
          const { data } = await wishlistCRUD.get(id);
          setName(data?.name);
          setPrivate(data?.private);
          setActive(data?.theme?.id);
          if (data?.private) {
            dispatch({
              type: HANDLE_SELECTED_FRIENDS,
              payload: data?.friends.map((el) => el.id)
            });
          }
        }
      } finally {
        stop2();
      }
    }());
  }, [isEdit]);

  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      if (!addedWishId) parent.setOptions({ tabBarStyle: { display: 'flex' } });
      dispatch({
        type: HANDLE_SELECTED_FRIENDS,
        payload: []
      });
    };
  }, [navigation]);

  const handleChangeSwitch = () => {
    setPrivate((prevState) => !prevState);
  };

  const handleAddWishLists = async () => {
    if (canNext) {
      if (isEdit) {
        await wishlistCRUD.edit(id, {
          name,
          theme: active,
          is_archive: false,
          private: privateWishList,
          friends: privateWishList ? selectedFriendsLocal?.map((el) => el.id) : []
        }).then(() => {
          reload();
          goToWishList();
          Toast.show({
            type: 'search',
            text1: 'Изменения сохранены',
            position: 'bottom',
            bottomOffset: 95
          });
        });
      } else {
        await createWishList({
          name,
          theme: active,
          privateMode: privateWishList,
          friends: privateWishList ? selectedFriendsLocal?.map((el) => el.id) : []
        }).then((response) => {
          if (addedWishId) {
            setWishListAdded(response?.id);
            goBack();
          } else {
            goToWishList();
          }
        });
      }

    }
  };

  const goToShareScreenHandle = () => {
    goToShareScreen({
      chooseFriend: true
    });
  };

  const screenHeight = Dimensions.get('window').height;

  const deleteFriendFromLocalHandler = (id) => {
    dispatch({
      type: HANDLE_DELETED_SELECTED_FRIENDS,
      payload: id
    });
    setSelectedFriendsLocal((prevState) => [...prevState.filter((el) => el.id !== id)]);
  };

  React.useEffect(() => {
    (async function () {
      if (selectedFriends.length) {
        start();
        try {
          const friends = await getFriends();
          let result = [];
          friends?.data.forEach((v) => {
            if (selectedFriends.includes(v.id)) {
              result.push(v);
            }
          });
          setSelectedFriendsLocal(result);
        } finally {
          stop();
        }
      }
    }());
  }, [selectedFriends, selectedFriends.length, start, stop]);

  const canNext = React.useMemo(() => {
    if (name.length) {
      if (privateWishList) {
        if (selectedFriendsLocal.length) {
          return true;
        }
        return false;
      }
      return true;

    }
    return false;
  }, [name, privateWishList, selectedFriendsLocal]);

  return (
    <View style={{ Height: 'auto', maxHeight: screenHeight, flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        style={{ backgroundColor: COLORS.white, maxHeight: '85%', }}
        contentContainerStyle={{
          flexGrow: 1, minHeight: '85%', display: 'flex', flexDirection: 'column'
        }}
      >
        {loading2 ? (
          <Loader />
        ) : (
          <WishListContainer style={{ alignItems: 'center' }}>
            <Text alignSelf="flex-start" mt="20px" fontSize={15}>Тема оформления:</Text>
            <ChooseTheme themes={themes} active={active} setActive={setActive} />
            <Text textAlign="center" color={COLORS.gray} fontSize={12}>Твой вишлист будет выглядеть так </Text>
            {active && (
            <Image
              alignSelf="center"
              marginTop="16px"
              width="260px"
              height="138px"
              source={{ uri: themes?.find((el) => el.id === active)?.preview }}
            />
            )}
            <InputText value={name} onChange={setName} marginBottom="20px" marginTop="30px" />
            <FormGroupContainer lst={0}>
              <FormGroupElementSwitch>
                <FormGroupTextSwitch>Приватный вишлист</FormGroupTextSwitch>
                <FormGroupSwitch
                  thumbColor="#fff"
                  value={privateWishList}
                  onChange={handleChangeSwitch}
                  trackColor={{ false: '#D4DAEC', true: '#8424FF' }}
                  ios_backgroundColor="#D4DAEC"
                />
              </FormGroupElementSwitch>
            </FormGroupContainer>
            <ProfilePrivateText>
              Включи, если хочешь, чтобы этот вишлист был доступен только опредёлнным друзьям
            </ProfilePrivateText>
            {loading ? <Spinner /> : privateWishList && (
            <View width="100%" paddingTop={30}>
              <View width="100%" flexDirection="row" display="flex" height="22px" justifyContent="space-between">
                <Text width="110px" fontSize={15}>
                  {selectedFriends?.length ? 'Доступен для' : 'Кому доступен'}
                  :
                </Text>
                <Text onPress={goToShareScreenHandle} width="66px" fontSize={15} color={COLORS.purple} fontFamily="NunitoBold">Выбрать</Text>
              </View>
              {selectedFriends?.length ? (
                <ListFriendsMinus
                  deleteFriendFromLocalHandler={deleteFriendFromLocalHandler}
                  data={selectedFriendsLocal}
                />
              ) : (
                <WishListPrivateText>
                  Выбери друзей, которым будет доступен
                  этот вишлист. Если никого не выбрать, его будешь видеть только ты.
                </WishListPrivateText>
              )}
            </View>
            )}
          </WishListContainer>
        )}
      </KeyboardAwareScrollView>
      <Box alignItems="center" height="15%" pt="20px" width="100%" backgroundColor={COLORS.white2}>
        <AuthButton onPress={handleAddWishLists} active={canNext}>
          {isEdit ? 'Сохранить изменения' : 'Готово'}
        </AuthButton>
      </Box>
    </View>
  );
}

export default AddWishList;
