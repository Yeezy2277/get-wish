import React, {useContext} from 'react';
import {Icon} from "../index";
import {Avatar, AvatarTouchableHighlight} from "../../styles/profile";
import {Image, Platform} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {ProfileContext} from "../../screens/Profile/ProfileScreen";
import {useSelector} from "react-redux";
import {connectActionSheet, useActionSheet} from "@expo/react-native-action-sheet";
import {changeUserInfo} from "../../redux/actions/authActions";
import {updateAvatar} from "../../redux/actions/userActions";
import {androidShadow} from "../../functions";

function ProfileAvatar({...props}) {
    const { showActionSheetWithOptions } = useActionSheet();

    const changeImage = () => {
        showActionSheetWithOptions(
            {
                options: ["Отмена", "Выбрать из галереи", "Сделать снимок"],
                title: 'Выбор фото',
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                } else if (buttonIndex === 1) {
                    let image = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: false,
                        aspect: [4, 3],
                        quality: 1,
                    });
                    if (!image.cancelled) {
                        navigation.push('ImageView', {
                            image
                        })
                    }
                } else if (buttonIndex === 2) {
                    const {status} = ImagePicker.requestCameraPermissionsAsync()
                    if (status !== "granted") {
                        let image = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: false,
                            aspect: [4, 3],
                            quality: 1,
                        });
                        if (!image.cancelled) {
                            navigation.push('ImageView', {
                                image,
                                camera: true
                            })
                        }
                    } else {
                        alert('Нет доступа')
                    }
                }
            }
        )
    }

    const {navigation} = useContext(ProfileContext)
    const {userInfo} = useSelector((state) => state.user);
    const hasPhoto = userInfo?.avatar

    const handleChangeAvatar = () => {
        if (hasPhoto) {
            showActionSheetWithOptions(
                {
                    options: ["Отмена", "Изменить фото", "Удалить фото"],
                    title: 'Выбор фото',
                    cancelButtonIndex: 0,
                    destructiveButtonIndex: 2,
                    userInterfaceStyle: 'dark'
                },
                async (buttonIndex) => {
                    if (buttonIndex === 1) {
                        changeImage()
                    } else if (buttonIndex === 2) {
                        showActionSheetWithOptions(
                            {
                                options: ["Отмена", "Удалить"],
                                title: 'Удалить фото профиля',
                                cancelButtonIndex: 0,
                                destructiveButtonIndex: 1,
                                userInterfaceStyle: 'dark'
                            }, async (buttonIndex) => {
                                if (buttonIndex === 1) {
                                    await updateAvatar(null, userInfo?.id)
                                }
                            })
                    }
                }
            )

        } else {
            changeImage()
        }
    }

    return (
        <Avatar>
            <Icon {...props} source={userInfo?.avatar ? {uri: `https://${userInfo?.avatar}`} : require('../../assets/images/icons/profile/avatar.png')}/>
            <AvatarTouchableHighlight style={Platform.OS === 'android' && androidShadow} onPress={handleChangeAvatar} underlayColor={'none'}>
                <Image style={{ height: 15, width: 18}} source={require('../../assets/images/icons/profile/edit.png')}/>
            </AvatarTouchableHighlight>
        </Avatar>
    );
}

const ConnectedApp = connectActionSheet(ProfileAvatar);

export default ConnectedApp;
