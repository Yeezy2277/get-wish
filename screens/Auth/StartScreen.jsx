import React from 'react';
import {ImageWishList, StartTouchableOpacity, StartWrapper} from "../../styles/auth";
import NavigationService from "../../functions/NavigationService";

const StartScreen = (props) => {
    const { screenProps } = props;

    const handleStart = () => {
        NavigationService.navigate(screenProps.nextStart)
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
