import React from 'react';
import {
    DesiresElementAvatar,
    DesiresElementAvatarImage,
    DesiresElementColumn,
    DesiresElementImage
} from "../../styles/profile";
import NavigationService, {navigateAction} from "../../functions/NavigationService";
import {Pressable} from "react-native";

function DesiresElement({source, empty = false}) {
    return (
        <Pressable onPress={() => navigateAction('DesiresScreen')}>
            <DesiresElementColumn>
                <DesiresElementImage source={source ? source : require('../../assets/images/icons/profile/desires/example1.png')} resizeMode="cover"/>
                {!empty && <DesiresElementAvatar>
                    <DesiresElementAvatarImage source={require('../../assets/images/icons/profile/desires/avatar1.png')}
                                               resizeMode="cover"/>
                </DesiresElementAvatar>}
            </DesiresElementColumn>
        </Pressable>
    );
}

export default DesiresElement;
