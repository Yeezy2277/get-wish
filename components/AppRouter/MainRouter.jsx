import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import {
    MainScreen,
} from '../../screens';

const MainNavigator = createStackNavigator(
    {
        Main: {
            screen: MainScreen,
        }
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none',
    }
);



export default createAppContainer(MainNavigator);
