import React from 'react';
import { Platform, Pressable } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'native-base';
import {
  DesiresScreenElementContainer,
  DesiresScreenElementContent,
  DesiresScreenElementContentBottom,
  DesiresScreenElementContentBottomAvatar,
  DesiresScreenElementContentBottomIcon,
  DesiresScreenElementContentBottomIconContainer,
  DesiresScreenElementContentBottomText,
  DesiresScreenElementContentDescription,
  DesiresScreenElementContentHeader,
  DesiresScreenElementContentHeaderImage,
  DesiresScreenElementContentHeaderTitle,
  DesiresScreenElementImage
} from '../../styles/profile';
import DesiresScreenElementActionsheet from './DesiresScreenElementActionsheet';
import { androidShadow } from '../../functions';
import { navigateAction } from '../../functions/NavigationService';
import { wishCRUD } from '../../http/CRUD';
import { GO_BACK_ID, SET_ONE_WISH } from '../../redux/constants/wishConstants';
import { ActionSheets } from '../../functions/ActionSheet';
import {useI18n} from "../../i18n/i18n";

function DesiresScreenElement({
  friend, setShowTutorial, showTutorial, el, isYourWishList, reserved
}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const t = useI18n()
  const { showActionSheetWithOptions } = useActionSheet();
  const state = new ActionSheets(t, showActionSheetWithOptions);
  const { goBackId } = useSelector((state) => state.wish);


  const handleClickImage = () => {
    if (isYourWishList) {
      return state.showShareActionInMyWish(el.id);
    }
    return showActionSheetWithOptions({
      options: [
          t('cancel'),
          t('share'),
      ],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
      }
    });

  };

  React.useEffect(() => {
    (async function viewModal() {
      if (goBackId === el.id) {
        dispatch({ type: GO_BACK_ID, payload: null });
        await handleOpen();
      }
    }());
  }, [goBackId]);

  const handleOpen = async () => {
    const res = await wishCRUD.get(el?.id);
    dispatch({
      type: SET_ONE_WISH,
      payload: res?.data
    });
    await setOpen(true);
    const showTutorialStorage = await AsyncStorage.getItem('showTutorial');
    if (showTutorialStorage !== null) {
      setShowTutorial(false);
    } else {
      setShowTutorial(true);
    }
  };

  return (
    <>
      <Pressable style={{ zIndex: 1, position: 'relative' }} onPress={handleOpen}>
        <DesiresScreenElementContainer style={Platform.OS === 'android' && androidShadow}>
          <DesiresScreenElementImage
            resizeMode="cover"
            source={el?.image ? { uri: el?.image }
              : require('../../assets/images/icons/wishlist/noPhoto.png')}
          />
          <DesiresScreenElementContent>
            <DesiresScreenElementContentHeader>
              <DesiresScreenElementContentHeaderTitle numberOfLines={2} style={{ fontFamily: 'NunitoBold' }}>
                {el.name}
              </DesiresScreenElementContentHeaderTitle>
              <Pressable
                style={{
                  zIndex: 2, height: 20, width: 50, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 15, flexDirection: 'row'
                }}
                onPress={handleClickImage}
              >
                <DesiresScreenElementContentHeaderImage resizeMode="contain" source={require('../../assets/images/icons/profile/desires/menu.png')} />
              </Pressable>
            </DesiresScreenElementContentHeader>
            <DesiresScreenElementContentDescription numberOfLines={2}>
              {el?.description}
            </DesiresScreenElementContentDescription>
            <DesiresScreenElementContentBottom>
              {el?.link && (
              <DesiresScreenElementContentBottomIconContainer>
                <DesiresScreenElementContentBottomIcon resizeMode="contain" h={Platform.OS === 'android' ? 7 : 10} source={require('../../assets/images/icons/profile/desires/link.png')} />
                <DesiresScreenElementContentBottomText numberOfLines={1}>
                  {el?.link}
                </DesiresScreenElementContentBottomText>
              </DesiresScreenElementContentBottomIconContainer>
              )}
              {el?.reservated && (
              <Image
                marginLeft="auto"
                resizeMode="contain"
                width="18.5px"
                height="12px"
                source={require('../../assets/images/icons/wishlist/bron.png')}
              />
              )}
              {reserved && (
              <DesiresScreenElementContentBottomAvatar
                resizeMode="cover"
                source={el?.user?.avatar ? { uri: el?.user?.avatar } : require('../../assets/images/icons/profile/avatar.png')}
              />
              )}
            </DesiresScreenElementContentBottom>
          </DesiresScreenElementContent>
        </DesiresScreenElementContainer>
      </Pressable>
      <DesiresScreenElementActionsheet
        showTutorial={showTutorial}
        setShowTutorial={setShowTutorial}
        friend={friend}
        open={open}
        isYourWishList={isYourWishList}
        setOpen={setOpen}
        reserved={reserved}
        reservedId={el?.user?.id}
        reserverImage={el?.user?.avatar}
      />
    </>
  );
}

export default DesiresScreenElement;
