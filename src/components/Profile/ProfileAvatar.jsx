import React, { useContext } from 'react';
import { Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { connectActionSheet, useActionSheet } from '@expo/react-native-action-sheet';
import { ProfileContext } from '../../screens/Profile/ProfileScreen';
import { Avatar, AvatarTouchableHighlight } from '../../styles/profile';
import { Icon } from '../index';
import { updateAvatar } from '../../redux/actions/userActions';
import { androidShadow } from '../../functions';
import {useI18n} from "../../i18n/i18n";

function ProfileAvatar({ ...props }) {
  const { showActionSheetWithOptions } = useActionSheet();

  const t = useI18n()
  const changeImage = () => {
    showActionSheetWithOptions(
      {
        options: [
            t('cancel'),
            t('profile_photoSelectFromGallery'),
            t('profile_photoTakeAShot'),
        ],
        title: t('profile_selectPhoto'),
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
          if (!image.cancelled) {
            navigation.push('ImageView', {
              image
            });
          }
        } else if (buttonIndex === 2) {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status === 'granted') {
            const image = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: false,
              aspect: [4, 3],
              quality: 1,
            });
            if (!image.cancelled) {
              navigation.push('ImageView', {
                image,
                camera: true
              });
            }
          } else {
            alert(t('accessDenied'));
          }
        }
      }
    );
  };

  const { navigation } = useContext(ProfileContext);
  const { userInfo } = useSelector((state) => state.user);
  const hasPhoto = userInfo?.avatar;

  const handleChangeAvatar = () => {
    if (hasPhoto) {
      showActionSheetWithOptions(
        {
          options: [
            t('cancel'),
            t('profile_photoChange'),
            t('profile_deletePhoto'),
          ],
          title: t('profile_selectPhoto'),
          cancelButtonIndex: 0,
          destructiveButtonIndex: 2,
          userInterfaceStyle: 'dark'
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) {
            changeImage();
          } else if (buttonIndex === 2) {
            showActionSheetWithOptions({
              options: [t('cancel'), t('delete')],
              title: t('profile_deletePhoto'),
              cancelButtonIndex: 0,
              destructiveButtonIndex: 1,
              userInterfaceStyle: 'dark'
            }, async (buttonIndexRes) => {
              if (buttonIndexRes === 1) {
                await updateAvatar(null, userInfo?.id);
              }
            });
          }
        }
      );

    } else {
      changeImage();
    }
  };

  return (
    <Avatar>
      <Icon {...props} source={userInfo?.avatar ? { uri: `${userInfo?.avatar}` } : require('../../assets/images/icons/profile/avatar.png')} />
      <AvatarTouchableHighlight style={Platform.OS === 'android' && androidShadow} onPress={handleChangeAvatar} underlayColor="none">
        <Image style={{ height: 15, width: 18 }} source={require('../../assets/images/icons/profile/edit.png')} />
      </AvatarTouchableHighlight>
    </Avatar>
  );
}

const ConnectedApp = connectActionSheet(ProfileAvatar);

export default ConnectedApp;
