import React from 'react';
import PropTypes from 'prop-types';
import {
  Actionsheet, Box, Button, Divider
} from 'native-base';
import { Platform, Pressable } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
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
import useToasts from '../../hooks/useToast';
import { navigateAction } from '../../functions/NavigationService';
import { COLORS } from '../../functions/constants';
import { TutorialFriendWishList } from '../index';

function DesiresScreenElementActionsheet({
  open, setOpen, friend, showTutorial, setShowTutorial
}) {
  const [openChild, setOpenChild] = React.useState(false);
  const { show } = useToasts(2000, 'Резерв желания отменен');
  const { showActionSheetWithOptions } = useActionSheet();

  const handleClickImage = () => {
    return showActionSheetWithOptions({
      options: ['Отмена', 'Поделиться'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
        setOpen(false);
        setOpenChild(false);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseChild = () => {
    setOpenChild(false);
  };

  const handleCloseButton = () => {
    handleClose();
    handleCloseChild();
    show();
  };

  return (
    <>
      <Actionsheet
        padding={0}
        isOpen={open}
        position="relative"
        onClose={handleClose}
      >
        <Actionsheet.Content style={{ elevation: 0 }} padding={0} backgroundColor="#fff">
          <ActionDesires>
            <ActionDesiresImageContainer>
              <ActionDesiresImage source={require('../../assets/images/icons/profile/desires/example1Bg.png')} />
              <ActionDesiresCount>
                <ActionDesiresCountText>3</ActionDesiresCountText>
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
                <Box
                  style={{
                    width: 86, paddingTop: 2, paddingBottom: 2, justifyContent: 'space-between', paddingLeft: 8, paddingRight: 8, height: 26, backgroundColor: COLORS.white, borderRadius: 6, alignItems: 'center', display: 'flex', flexDirection: 'row'
                  }}
                  _text={{
                    color: '#8424FF'
                  }}
                >
                  <ActionDesiresRowLinksIcon resizeMode="contain" h={Platform.OS === 'android' ? 10 : 13} source={require('../../assets/images/icons/profile/desires/link.png')} />
                  <ActionDesiresRowLinksText>zara.ru</ActionDesiresRowLinksText>
                </Box>
                <Pressable
                  style={{
                    zIndex: 2, width: 50, height: 25, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8, flexDirection: 'row'
                  }}
                  onPress={handleClickImage}
                >
                  <ActionDesiresRowLinksMenu source={require('../../assets/images/icons/profile/desires/menu.png')} />
                </Pressable>
              </ActionDesiresRowLinks>
              <ActionDesiresRowName>Рождественский свитер</ActionDesiresRowName>
              <ActionDesiresRowDescription>
                Размер 42-44
              </ActionDesiresRowDescription>
              <Button
                style={{
                  backgroundColor: COLORS.white,
                  height: 50,
                  marginBottom: 10,
                  borderRadius: 10,
                  marginTop: 30
                }}
                _text={{
                  color: '#8424FF'
                }}
                onPress={() => setOpenChild(true)}
              >
                Отменить резервирование
              </Button>
            </ActionDesiresRow>
          </ActionDesires>
        </Actionsheet.Content>
        {showTutorial && <TutorialFriendWishList setShowTutorial={setShowTutorial} />}
      </Actionsheet>
      <Actionsheet padding={0} isOpen={openChild} onClose={handleCloseChild}>
        <Actionsheet.Content backgroundColor="#fff" padding={0}>
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
                onPress={handleCloseButton}
              >
                Да, я передумал
              </Button>
              <AuthButton variant="small" onPress={handleCloseChild} text="Упс, закрыть" />
            </ActionDesiresChildButton>
          </ActionElementChild>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

DesiresScreenElementActionsheet.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DesiresScreenElementActionsheet;