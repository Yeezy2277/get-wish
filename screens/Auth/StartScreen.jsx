import React from 'react';
import {ImageWishList, StartTouchableOpacity, StartWrapper} from "../../styles/auth";

const StartScreen = (props) => {
    const { navigation } = props;

    const handleStart = () => {
        navigation.navigate('Auth')
    }


    return (
        <StartWrapper source={require('../../assets/images/auth/background.png')} resizeMode="cover" >
            <StartTouchableOpacity onPress={handleStart}>
                <ImageWishList source={require('../../assets/images/auth/GetWish.png')}/>
            </StartTouchableOpacity>
        </StartWrapper>
    );
}

export default StartScreen;
