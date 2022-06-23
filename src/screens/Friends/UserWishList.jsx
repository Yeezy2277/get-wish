import React from 'react';
import {
  Box,
  Fab,
  Image,
  ScrollView, Text, View
} from 'native-base';
import { Alert, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  HeaderArrow, HeaderAvatar, HeaderPressable, HeaderPressableAvatar
} from '../../styles/shared';
import {
  declOfNum, goBack, goToAddWish, goToWishList
} from '../../functions/helpers';
import { COLORS } from '../../functions/constants';
import { DesiresScreenRow } from '../../styles/profile';
import { DesiresScreenElement, Loader } from '../../components';
import Header from '../../components/Header/Header';
import { wishlistCRUD } from '../../http/CRUD';
import { SET_ONE_WISH_LIST } from '../../redux/constants/wishListConstants';
import { FriendsContainerFirst, FriendsImageEmpty } from '../../styles/friends';
import AuthButton from '../../components/Shared/AuthButton';
import useLoader from '../../hooks/useLoader';
import { ActionSheets } from '../../functions/ActionSheet';
import { useI18n } from '../../i18n/i18n';

function UserWishList({ navigation, route: { params: { id, backToWish } } }) {
  const { start, stop, loading } = useLoader(false);
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(false);
  const dispatch = useDispatch();
  const t = useI18n();
  const { oneWishList } = useSelector((state) => state.wishList);
  const { reloadValue } = useSelector((state) => state.generic);
  const { userInfo: { id: userId } } = useSelector((state) => state.user);
  const { oneUser } = useSelector((state) => state.user);
  const { showActionSheetWithOptions } = useActionSheet();
  const state = new ActionSheets(t, showActionSheetWithOptions);
  const parent = navigation.getParent();

  const isYourWishList = React.useMemo(
    () => oneWishList?.user_id === userId,
    [oneWishList?.user_id, userId]
  );

  const handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.y > 150) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  };

  React.useEffect(() => {
    (async function load() {
      start();
      const wishList = await wishlistCRUD.get(id);
      dispatch({ type: SET_ONE_WISH_LIST, payload: wishList?.data });
      stop();
    }());
  }, [id, reloadValue]);

  const handleClickOption = () => {
    if (isYourWishList) {
      state.showShareActionInMyWishList(
        oneWishList?.id,
        oneWishList,
        oneWishList?.private,
        oneWishList?.is_archive,
        null,
        parent,
        true
      );
    }
  };

  return (
    <>
      {!oneWishList?.wishes?.length ? (
        <ScrollView
          height="100%"
          width="100%"
          backgroundColor={COLORS.white2}
        >
          <Header
            backHandler={() => {
              if (backToWish) {
                goToWishList();
              } else {
                goBack();
              }
            }}
            morePress={handleClickOption}
            more
            cancel
            title={oneWishList?.name}
            navigation={navigation}
          />
          <FriendsContainerFirst style={{ marginTop: 76 }}>
            <FriendsImageEmpty resizeMode="cover" source={require('../../assets/images/icons/wishlist/wish_placeholder.png')} />
            <Text
              color={COLORS.black}
              fontFamily="NunitoBold"
              marginTop="14px"
              fontWeight="bold"
              fontSize="18px"
              lineHeight="25px"
            >
              Здесь ни одного желания
            </Text>
            <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">Твоим друзьям придётся поломать голову!</Text>
            <AuthButton
              style={{
                zIndex: 999, display: 'flex', width: 172, marginTop: 40
              }}
              onPress={goToAddWish}
              variant="small"
              bxShadow
              text="Задагать желание"
            />
          </FriendsContainerFirst>
        </ScrollView>
      ) : loading ? <Loader /> : (
        <ImageBackground
          resizeMode="cover"
          source={{ uri: oneWishList?.theme?.image }}
          style={{
            width: '100%',
            position: 'relative',
            height: '100%',
          }}
        >
          {showHeader ? (
            <Header
              backHandler={() => {
                if (backToWish) {
                  goToWishList();
                } else {
                  return null;
                }
              }}
              morePress={handleClickOption}
              more
              cancel
              title={oneWishList?.name}
              navigation={navigation}
            />
          )
            : (
              <View height="88px">
                <HeaderPressable onPress={() => {
                  if (backToWish) {
                    goToWishList();
                  } else {
                    goBack();
                  }
                }}
                >
                  <HeaderArrow source={require('../../assets/images/icons/arrow.png')} />
                </HeaderPressable>
                <HeaderPressableAvatar onPress={handleClickOption}>
                  <HeaderAvatar
                    style={isYourWishList && { height: 4, width: 20 }}
                    source={isYourWishList ? require('../../assets/images/icons/header/more.png')
                      : (oneUser?.avatar ? { uri: oneUser.avatar } : require('../../assets/images/icons/profile/avatar.png'))}
                  />
                </HeaderPressableAvatar>
              </View>
            )}
          <ScrollView
            display="flex"
            scrollEventThrottle={17}
            onScroll={handleScroll}
            width="100%"
            height="100%"
            paddingTop={'0'}
          >
            <Text
              fontFamily="NunitoBold"
              maxWidth="276px"
              alignSelf="center"
              width="100%"
              textAlign="center"
              fontSize="22px"
              fontWeight="800"
              color={COLORS.black}
            >
              {oneWishList?.theme?.symbol}
              {' '}
              {oneWishList?.name}
            </Text>
            <Box alignSelf="center" flexDirection="row" alignItems="center" marginTop="10px">
              {oneWishList?.private
              && <Image marginRight="10px" width="17px" height="12px" source={require('../../assets/images/icons/wishlist/privateIcon.png')} />}
              <Text
                textAlign="center"
                fontSize="16px"
                fontWeight="600"
                color={COLORS.gray}
              >
                {oneWishList?.wishes?.length
                  ? `${oneWishList?.wishes?.length} ${declOfNum(
                    oneWishList?.wishes?.length,
                    ['желание', 'желания', 'желаний']
                  )}` : 'Нет желаний'}
              </Text>
            </Box>
            <DesiresScreenRow>
              {oneWishList?.wishes?.map((el) => {
                return (
                  <DesiresScreenElement
                    showTutorial={showTutorial}
                    friend
                    isYourWishList={isYourWishList}
                    el={el}
                    key={el.id}
                    setShowTutorial={setShowTutorial}
                  />
                );
              })}
            </DesiresScreenRow>
          </ScrollView>
          {isYourWishList && (
          <Fab
            onPress={goToAddWish}
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
          )}
        </ImageBackground>
      )}
    </>
  );
}

export default UserWishList;
