import React from 'react';
import PropTypes from 'prop-types';
import {
  Actionsheet, Box, Button, Divider,
  Image, Link, Pressable, Text
} from 'native-base';
import { Platform } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  ActionDesires,
  ActionDesiresActions,
  ActionDesiresActionsIcon,
  ActionDesiresActionsText,
  ActionDesiresChildButton,
  ActionDesiresChildDescription, ActionDesiresChildName,
  ActionDesiresCount,
  ActionDesiresCountIcon,
  ActionDesiresCountText,
  ActionDesiresImage,
  ActionDesiresImageContainer,
  ActionDesiresRow, ActionDesiresRowDescription,
  ActionDesiresRowHeader,
  ActionDesiresRowHeaderAvatar,
  ActionDesiresRowHeaderName,
  ActionDesiresRowLinks,
  ActionDesiresRowLinksIcon,
  ActionDesiresRowLinksMenu,
  ActionDesiresRowName, ActionElementChild
} from '../../styles/profile';
import AuthButton from '../Shared/AuthButton';
import { COLORS } from '../../functions/constants';
import { DesiresScreenElementActionsheetWhy, TutorialFriendWishList } from '../index';
import { goToSwiper, goToUserWishLists } from '../../functions/helpers';
import { ActionSheets } from '../../functions/ActionSheet';
import { deleteReserveWish, getCountInUser } from '../../redux/actions/wishListActions';
import DesiresScreenElementActionsheetReserv from './DesiresScreenElementActionsheetReserv';
import ButtonReserved from '../../sections/Buttons/ButtonReserved';
import { reload } from '../../redux/actions/genericActions';
import {useI18n} from "../../i18n/i18n";
import {userCRUD} from "../../http/CRUD";
import {SET_ONE_USER} from "../../redux/constants/userConstants";

function DesiresScreenElementActionsheet({
  open, setOpen, friend,
  showTutorial, setShowTutorial, isYourWishList, reserved, reserverImage, reservedId
}) {
  const t = useI18n()
  const { userInfo } = useSelector((state) => state.user);
  const { oneWish } = useSelector((state) => state.wish);
  const { countRes } = useSelector((state) => state.wishList);
  const { oneUser } = useSelector((state) => state.user);
  const [openChild, setOpenChild] = React.useState(false);
  const [openChildWhy, setOpenChildWhy] = React.useState(false);
  const [userNameRes, setUserNameRes] = React.useState('');
  const [openChildReserv, setOpenChildReserv] = React.useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const [reservUser, setReservUser] = React.useState()
  const dispatch = useDispatch()
  const state = new ActionSheets(t, showActionSheetWithOptions);

  React.useEffect(() => {
    (async function () {
      if (reserved && reservedId) {
        const {data} = await userCRUD.get(reservedId)
        setUserNameRes(data.username)
        setReservUser(data)
      }
    }())
  }, [reserved, reservedId])

  const goToAnotherList = () => {
    close()
    dispatch({type: SET_ONE_USER, payload: reservUser})
    return goToUserWishLists({id: oneWish?.wishlist_id});
  };

  const close = () => {
    setOpen(false);
    setOpenChild(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseChild = () => {
    setOpenChild(false);
  };

  const handleCancelReserve = async () => {
    await deleteReserveWish(oneWish?.id, reserved);
    // handleClose();
    if (reserved) {
      setOpen(false);
      setOpenChild(false);
      setOpenChildWhy(false);
      await reload();
    }
    handleCloseChild();
    Toast.show({
      type: 'search',
      text1: t('desires_reservedWishCanceled'),
      position: 'bottom',
      bottomOffset: 95
    });
  };

  React.useEffect(() => {
    (async function getData() {
      if (isYourWishList) return;
      await getCountInUser(oneUser?.id);
    }());
  }, [isYourWishList, oneUser?.id]);

  const handleGoToSwiper = () => {
    if (oneWish?.images?.length) {
      goToSwiper({
        images: oneWish?.images.map((el) => {
          return { url: el };
        })
      });
    }
  };

  const RenderResImage = React.useCallback((count, cancel = false) => {
    if (reserved) {
      return  null
    }
    if (count === 0) {
      return (
        <Image
          marginRight="20px"
          source={cancel ? require('../../assets/images/icons/wishlist/reserv3Cancel.png')
            : require('../../assets/images/icons/wishlist/reserv3.png')}
          height="20px"
          zIndex={999}
          width="30px"
        />
      );
    }
    if (count === 1) {
      return (
        <Image
          marginRight="20px"
          source={cancel ? require('../../assets/images/icons/wishlist/reserv2Cancel.png')
            : require('../../assets/images/icons/wishlist/reserv2.png')}
          height="20px"
          zIndex={999}
          width="30px"
        />
      );
    }
    if (count === 2) {
      return (
        <Image
          marginRight="20px"
          source={cancel ? require('../../assets/images/icons/wishlist/reserv1Cancel.png')
            : require('../../assets/images/icons/wishlist/reserv1.png')}
          height="20px"
          zIndex={999}
          width="30px"
        />
      );
    }
  }, [countRes]);

  return (
    <>
      <Actionsheet
        zIndex={2}
        padding={0}
        isOpen={open}
        position="relative"
        onClose={handleClose}
      >
        <Actionsheet.Content paddingBottom="20px" zIndex={998} style={{ elevation: 0 }} padding={0} backgroundColor="#fff">
          <ActionDesires>
            <ActionDesiresImageContainer>
              <Pressable onPress={handleGoToSwiper} width="100%" height="250px">
                <ActionDesiresImage source={oneWish?.images?.length ? { uri: oneWish?.images[0] }
                  : require('../../assets/images/icons/wishlist/noPhotoBig.png')}
                />
              </Pressable>
              <ActionDesiresCount>
                <ActionDesiresCountText>{oneWish?.images?.length}</ActionDesiresCountText>
                <ActionDesiresCountIcon source={require('../../assets/images/icons/profile/desires/photo.png')} />
              </ActionDesiresCount>
            </ActionDesiresImageContainer>
            <ActionDesiresRow>
              {reserved && (
              <ActionDesiresRowHeader>
                <ActionDesiresRowHeaderAvatar source={reserverImage ? { uri: reserverImage }
                  : require('../../assets/images/icons/profile/avatar.png')}
                />
                <ActionDesiresRowHeaderName>{reserved ? userNameRes : oneWish?.user?.username}</ActionDesiresRowHeaderName>
                <ActionDesiresActions onPress={goToAnotherList}>
                  <ActionDesiresActionsText>{t('desires_toWishList')}</ActionDesiresActionsText>
                  <ActionDesiresActionsIcon source={require('../../assets/images/icons/arrow.png')} />
                </ActionDesiresActions>
              </ActionDesiresRowHeader>
              )}
              {!friend && <Divider />}
              <ActionDesiresRowLinks>
                {oneWish?.link && (
                <Box
                  style={{
                    maxWidth: 86, minWidth: 55, paddingTop: 2, paddingBottom: 2, justifyContent: 'space-between', paddingLeft: 8, paddingRight: 8, height: 26, backgroundColor: COLORS.white, borderRadius: 6, alignItems: 'center', display: 'flex', flexDirection: 'row'
                  }}
                  _text={{
                    color: '#8424FF'
                  }}
                >
                  <ActionDesiresRowLinksIcon resizeMode="contain" h={Platform.OS === 'android' ? 10 : 13} source={require('../../assets/images/icons/profile/desires/link.png')} />
                  <Link
                    maxWidth="50px"
                    fontWeight="600"
                    marginLeft="5px"
                    href={oneWish?.link}
                    fontSize={16}
                    _text={{
                      color: COLORS.purple, textDecoration: 'none', fontWeigh: '600', maxWidth: '50px'
                    }}
                    color={COLORS.purple}
                    numberOfLines={1}
                  >
                    {oneWish?.link}
                  </Link>
                </Box>
                )}
                {!oneWish?.link && (
                <ActionDesiresRowName
                  numberOfLines={2}
                  style={{ marginTop: 0 }}
                >
                  {oneWish?.name}
                </ActionDesiresRowName>
                )}
                <Pressable
                  style={{
                    zIndex: 2,
                    marginLeft: 'auto',
                    width: 50,
                    height: 25,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: 8,
                    flexDirection: 'row'
                  }}
                  onPress={() => {
                    if (!isYourWishList) {
                      state.showShareAction(close);
                    } else {
                      state.showShareActionInMyWish(oneWish?.id, close, true);
                    }
                  }}
                >
                  <ActionDesiresRowLinksMenu source={require('../../assets/images/icons/profile/desires/menu.png')} />
                </Pressable>
              </ActionDesiresRowLinks>
              {oneWish?.link && (
              <ActionDesiresRowName
                numberOfLines={2}
              >
                {oneWish?.name}
              </ActionDesiresRowName>
              )}
              <ActionDesiresRowDescription style={{ marginBottom: isYourWishList ? 20 : 0 }}>
                {oneWish?.description}
              </ActionDesiresRowDescription>
              {!isYourWishList ? ((!oneWish?.reservated && countRes !== 3) ? (
                <ButtonReserved onPress={() => setOpenChildReserv(true)} countRes={countRes} />
              ) : (!oneWish?.reservated && countRes === 3) ? (
                <Box
                  borderRadius="12"
                  paddingTop="12px"
                  paddingBottom="12px"
                  paddingLeft="15px"
                  width="100%"
                  maxWidth="335px"
                  flexDirection="column"
                  alignSelf="center"
                  backgroundColor={COLORS.extralightGray}
                  height="64px"
                >
                  <Text fontSize="14px" maxWidth="305px">Ты больше не можешь резервировать</Text>
                  <Text fontSize="14px" maxWidth="305px">
                    желания этого друга.
                    {' '}
                    {' '}
                    <Text onPress={() => setOpenChildWhy(true)} color={COLORS.purple}>Почему?</Text>
                  </Text>
                </Box>
              ) : (
                userInfo?.id === oneWish?.user_id ? (
                  <Button
                    style={{
                      backgroundColor: COLORS.white,
                      height: 50,
                      maxWidth: 335,
                      width: '100%',
                      alignSelf: 'center',
                      borderRadius: 10,
                      marginTop: 30
                    }}
                    _text={{
                      color: '#8424FF'
                    }}
                    onPress={() => setOpenChild(true)}
                  >
                    <Box alignItems="center" flexDirection="row" width="100%" height="53px">
                      { RenderResImage(countRes, true)}
                      <Text fontSize={15} fontFamily="NunitoBold" color={COLORS.purple}>{t('desires_cancelReservedWish')}</Text>
                    </Box>
                  </Button>
                ) : (
                  <Box
                    borderRadius="12"
                    paddingTop="12px"
                    paddingBottom="12px"
                    paddingLeft="15px"
                    width="100%"
                    maxWidth="335px"
                    alignItems="center"
                    flexDirection="row"
                    alignSelf="center"
                    backgroundColor={COLORS.extralightGray}
                    height="64px"
                  >
                    <Image
                      size="40px"
                      borderRadius="20px"
                      source={oneWish?.user ? (oneWish?.user?.avatar ? { uri: `${oneWish?.user?.avatar}` }
                        : require('../../assets/images/icons/profile/avatar.png'))
                        : require('../../assets/images/icons/wishlist/anonim.png')}
                    />
                    <Box marginLeft="10px">
                      <Text fontSize={14} color={COLORS.black}>{oneWish?.user ? oneWish?.user?.username : 'Таинственный незнакомец'}</Text>
                      <Text fontSize={14} color={COLORS.gray}>
                        {t('desires_reserved')}
                      </Text>
                    </Box>
                  </Box>
                )

              )) : oneWish?.reservated ? (
                <Box
                  borderRadius="12"
                  paddingTop="12px"
                  paddingBottom="12px"
                  paddingLeft="15px"
                  width="100%"
                  maxWidth="335px"
                  alignItems="center"
                  flexDirection="row"
                  alignSelf="center"
                  backgroundColor={COLORS.extralightGray}
                  height="64px"
                >
                  <Image
                    size="40px"
                    borderRadius="20px"
                    source={oneWish?.user ? oneWish?.user?.avatar ? { uri: `${oneWish?.user?.avatar}` }
                      : require('../../assets/images/icons/profile/avatar.png') : require('../../assets/images/icons/wishlist/anonim.png')}
                  />
                  <Box marginLeft="10px">
                    <Text fontSize={14} color={COLORS.black}>{oneWish?.user ? oneWish?.user?.username : 'Таинственный незнакомец'}</Text>
                    <Text fontSize={14} color={COLORS.gray}>
                      {t('desires_reserved')}
                    </Text>
                  </Box>
                </Box>
              ) : null}
            </ActionDesiresRow>
          </ActionDesires>
        </Actionsheet.Content>
        {showTutorial && <TutorialFriendWishList setShowTutorial={setShowTutorial} />}
      </Actionsheet>
      <Actionsheet zIndex={999} padding={0} isOpen={openChild} onClose={handleCloseChild}>
        <Actionsheet.Content zIndex={999} style={{ elevation: 1 }} backgroundColor="#fff" padding={0}>
          <ActionElementChild>
            <ActionDesiresChildName>
              {t('desires_confirmCancelReservedWishTitle')}
            </ActionDesiresChildName>
            <ActionDesiresChildDescription>
              {t('desires_confirmCancelReservedWishSubtitle')}
            </ActionDesiresChildDescription>
            <ActionDesiresChildButton>
              <Button
                style={{
                  backgroundColor: COLORS.white,
                  height: 46,
                  maxWidth: 162.5,
                  borderRadius: 12,
                  flex: 1
                }}
                _text={{
                  color: '#8424FF'
                }}
                onPress={handleCancelReserve}
              >
                {t('desires_confirmCancelReservedWishYes')}
              </Button>
              <AuthButton variant="small" onPress={handleCloseChild} text={t('desires_confirmCancelReservedWishNo')}/>
            </ActionDesiresChildButton>
          </ActionElementChild>
        </Actionsheet.Content>
      </Actionsheet>
      <DesiresScreenElementActionsheetReserv open={openChildReserv} setOpen={setOpenChildReserv} />
      <DesiresScreenElementActionsheetWhy open={openChildWhy} setOpen={setOpenChildWhy} />
    </>
  );
}

DesiresScreenElementActionsheet.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DesiresScreenElementActionsheet;
