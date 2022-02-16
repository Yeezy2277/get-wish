import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import {
    AuthScreen
} from '../../screens';

const AuthNavigator = createStackNavigator(
    {
        Auth: {
            screen: AuthScreen,
        }
    },
    {
        initialRouteName: 'Auth',
        headerMode: 'none'
    }
);

export default createAppContainer(AuthNavigator);
