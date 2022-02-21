import React from 'react';
import {Image, TouchableHighlight} from "react-native";
import {ProfileHeader} from "../../styles/profile";

function Icon({handlePressIcon, source, ...props}) {
    return (
        <TouchableHighlight underlayColor={'none'} onPress={handlePressIcon}>
            <ProfileHeader>
                <Image source={source} {...props}/>
            </ProfileHeader>
        </TouchableHighlight>
    );
}

export default Icon;
