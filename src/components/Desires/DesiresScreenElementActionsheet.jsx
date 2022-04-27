import React from 'react';
import PropTypes from 'prop-types';
import {
  Actionsheet, Avatar, Box, Button, Divider, Image, Pressable, Text
} from 'native-base';
import { Platform } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useSelector } from 'react-redux';
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
  ActionDesiresRowLinksText, ActionDesiresRowName, ActionElementChild
} from '../../styles/profile';
import AuthButton from '../Shared/AuthButton';
import { COLORS } from '../../functions/constants';
import { DesiresScreenElementActionsheetWhy, TutorialFriendWishList } from '../index';
import { goToSwiper } from '../../functions/helpers';
import { ActionSheets } from '../../functions/ActionSheet';
import { deleteReserveWish, getCountInUser } from '../../redux/actions/wishListActions';
import DesiresScreenElementActionsheetReserv from './DesiresScreenElementActionsheetReserv';

function DesiresScreenElementActionsheet({
  open, setOpen, friend, showTutorial, setShowTutorial, isYourWishList
}) {
  const { userInfo } = useSelector((state) => state.user);
  const { oneWish } = useSelector((state) => state.wish);
  const { countRes } = useSelector((state) => state.wishList);
  const { oneUser } = useSelector((state) => state.user);
  const [openChild, setOpenChild] = React.useState(false);
  const [openChildWhy, setOpenChildWhy] = React.useState(false);
  const [openChildReserv, setOpenChildReserv] = React.useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const state = new ActionSheets(showActionSheetWithOptions);

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
    await deleteReserveWish(oneWish?.id);
    handleClose();
    handleCloseChild();
    Toast.show({
      type: 'search',
      text1: 'Резерв желания отменён',
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

  function RenderResImage(count, cancel = false) {
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
  }

  return (
    <>
      <Actionsheet
        zIndex={998}
        padding={0}
        isOpen={open}
        position="relative"
        onClose={handleClose}
      >
        <Actionsheet.Content zIndex={998} style={{ elevation: 0 }} padding={0} backgroundColor="#fff">
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
              {!friend && (
              <ActionDesiresRowHeader>
                <ActionDesiresRowHeaderAvatar source={require('../../assets/images/icons/profile/desires/avatar1.png')} />
                <ActionDesiresRowHeaderName>anastasia_efremova</ActionDesiresRowHeaderName>
                <ActionDesiresActions>
                  <ActionDesiresActionsText>В вишлист</ActionDesiresActionsText>
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
                  <ActionDesiresRowLinksText
                    numberOfLines={1}
                  >
                    {oneWish?.link}
                  </ActionDesiresRowLinksText>
                </Box>
                )}
                {!oneWish?.link && (
                <ActionDesiresRowName
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
                      state.showShareActionInMyWish(oneWish?.id, close);
                    }
                  }}
                >
                  <ActionDesiresRowLinksMenu source={require('../../assets/images/icons/profile/desires/menu.png')} />
                </Pressable>
              </ActionDesiresRowLinks>
              {oneWish?.link && <ActionDesiresRowName>{oneWish?.name}</ActionDesiresRowName>}
              <ActionDesiresRowDescription style={{ marginBottom: isYourWishList ? 20 : 0 }}>
                {oneWish?.description}
              </ActionDesiresRowDescription>
              {!isYourWishList ? ((!oneWish?.reservated && countRes !== 3) ? (
                <AuthButton
                  onPress={() => {
                    setOpenChildReserv(true);
                  }}
                  style={{
                    height: 50, marginBottom: 10, alignSelf: 'center', marginTop: 30
                  }}
                  higlightStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                  active
                >
                  <Box width="100%" height="50px" display="flex" alignItems="center" flexDirection="row">
                    {RenderResImage(countRes)}
                    <Text fontSize={16} fontFamily="NunitoBold" color={COLORS.white}>Зарезервировать желание</Text>
                  </Box>
                </AuthButton>
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
                      marginBottom: 10,
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
                    <Box alignItems="center" flexDirection="row" width="100%" height="100%">
                      {RenderResImage(countRes, true)}
                      <Text fontSize={15} fontFamily="NunitoBold" color={COLORS.purple}>Отменить резервирование</Text>
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
                    <Avatar
                      size="40px"
                      source={oneWish?.user ? (oneWish?.user?.avatar ? { uri: `${oneWish?.user?.avatar}` }
                        : require('../../assets/images/icons/profile/avatar.png'))
                        : require('../../assets/images/icons/wishlist/anonim.png')}
                    />
                    <Box marginLeft="10px">
                      <Text fontSize={14} color={COLORS.black}>{oneWish?.user ? oneWish?.user?.username : 'Таинственный незнакомец'}</Text>
                      <Text fontSize={14} color={COLORS.gray}>
                        {oneWish?.user ? 'зарезервировал(-а) это желание'
                          : 'зарезервировал это желание'}
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
                  <Avatar
                    size="40px"
                    source={oneWish?.user ? oneWish?.user?.avatar ? { uri: `${oneWish?.user?.avatar}` }
                      : require('../../assets/images/icons/profile/avatar.png') : require('../../assets/images/icons/wishlist/anonim.png')}
                  />
                  <Box marginLeft="10px">
                    <Text fontSize={14} color={COLORS.black}>{oneWish?.user ? oneWish?.user?.username : 'Таинственный незнакомец'}</Text>
                    <Text fontSize={14} color={COLORS.gray}>
                      {oneWish?.user ? 'зарезервировал(-а) это желание'
                        : 'зарезервировал это желание'}
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
              Ты передумал исполнять
              это желание?
            </ActionDesiresChildName>
            <ActionDesiresChildDescription>
              Или просто случайно сюда нажал?
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
                Да, я передумал
              </Button>
              <AuthButton variant="small" onPress={handleCloseChild} text="Упс, закрыть" />
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
