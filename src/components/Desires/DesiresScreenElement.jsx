import React from 'react';
import { Platform, Pressable } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
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

function DesiresScreenElement() {
  const [open, setOpen] = React.useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const handleClickImage = () => {
    return showActionSheetWithOptions({
      options: ['Отмена', 'Поделиться'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
      }
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Pressable style={{ zIndex: 1 }} onPress={handleOpen}>
        <DesiresScreenElementContainer style={Platform.OS === 'android' && androidShadow}>
          <DesiresScreenElementImage resizeMode="cover" source={require('../../assets/images/icons/profile/desires/example1.png')} />
          <DesiresScreenElementContent>
            <DesiresScreenElementContentHeader>
              <DesiresScreenElementContentHeaderTitle>
                Новогодний свитер
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
            <DesiresScreenElementContentDescription>
              Размер 42-44
            </DesiresScreenElementContentDescription>
            <DesiresScreenElementContentBottom>
              <DesiresScreenElementContentBottomIconContainer>
                <DesiresScreenElementContentBottomIcon resizeMode="contain" h={Platform.OS === 'android' ? 7 : 10} source={require('../../assets/images/icons/profile/desires/link.png')} />
                <DesiresScreenElementContentBottomText>
                  zara.ru
                </DesiresScreenElementContentBottomText>
              </DesiresScreenElementContentBottomIconContainer>
              <DesiresScreenElementContentBottomAvatar resizeMode="cover" source={require('../../assets/images/icons/profile/desires/avatar1.png')} />
            </DesiresScreenElementContentBottom>
          </DesiresScreenElementContent>
        </DesiresScreenElementContainer>
      </Pressable>
      <DesiresScreenElementActionsheet open={open} setOpen={setOpen} />
    </>
  );
}

export default DesiresScreenElement;
