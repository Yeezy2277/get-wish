import React, {useContext} from 'react';
import {Icon} from "../index";
import {Avatar, AvatarTouchableHighlight} from "../../styles/profile";
import {Image, ActionSheetIOS } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {ProfileContext} from "../../screens/Profile/ProfileScreen";

function ProfileAvatar({...props}) {

    const {navigation} = useContext(ProfileContext)

    const handleChangeAvatar = () => {
        ActionSheetIOS.showActionSheetWithOptions(
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
                    navigation.push('ImageView', {
                        image
                    })

                } else if (buttonIndex === 2) {
                }
            }
        );
    }

    return (
        <Avatar>
            <Icon {...props} source={require('../../assets/images/icons/profile/avatar.png')}/>
            <AvatarTouchableHighlight onPress={handleChangeAvatar} underlayColor={'none'}>
                <Image style={{ height: 15, width: 18}} source={require('../../assets/images/icons/profile/edit.png')}/>
            </AvatarTouchableHighlight>
        </Avatar>
    );
}

export default ProfileAvatar;
