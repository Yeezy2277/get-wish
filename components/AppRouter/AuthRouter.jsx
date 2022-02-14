import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import {
    AuthScreen, MainScreen,
    StartScreen
} from '../../screens';

const AuthNavigator = createStackNavigator(
    {
        Start: {
            screen: StartScreen,
        },
        Auth: {
            screen: AuthScreen,
        }
    },
    {
        initialRouteName: 'Start',
        headerMode: 'none'
    }
);

export default createAppContainer(AuthNavigator);
