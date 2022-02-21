import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    ImageView,
    MainScreen, ProfileScreen,
} from '../../screens';
import {COLORS} from "../../functions/constants";
import {Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ImageView" component={ImageView} />
        </Stack.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Main"
                tabBarOptions={{
                    activeTintColor: COLORS.purple,
                }}
                screenOptions={{ headerShown: false }}
                >
                <Tab.Screen
                    name="Main"
                    component={MainScreen}
                />
                <Tab.Screen
                    name="Profile"
                    component={MyStack}
                    options={{
                        tabBarOptions: { showIcon: true },
                        tabBarIcon: ({ tintColor }) => {
                            return <Image style={{ width: 26, height: 26 }} source={require('../../assets/images/icons/bottom/profile.png')}/>
                        },
                        tabBarLabel: 'Профиль'
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default App;
