import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
    AuthScreen,
    StartScreen
} from './screens/index';

const AppNavigator = createStackNavigator(
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

export default createAppContainer(AppNavigator);
