import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    ChangePhoneScreen,
    DesiresScreen,
    ImageView,
    MainScreen, ProfileScreen, ShareScreen,
} from '../../screens';
import {COLORS} from "../../functions/constants";
import {Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {navigationRef} from "../../functions/NavigationService";
import Header from "../Header/Header";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
    return (
            <Stack.Navigator initialRouteName="MainProfile">
                <Stack.Screen options={{headerShown: false}} name="MainProfile" component={ProfileScreen} />
                <Stack.Screen options={{headerShown: false}} name="ImageView" component={ImageView} />
                <Stack.Screen options={{headerShown: false}} name="ShareScreen" component={ShareScreen} />
                <Stack.Screen options={{headerShown: false}} name="ChangePhoneScreen" component={ChangePhoneScreen} />
                <Stack.Screen options={{header: (navigation) => <Header title="Зарезервированные желания" navigation={navigation}/>}} name="DesiresScreen" component={DesiresScreen} />
            </Stack.Navigator>
    );
}

function TabStack() {
    const {avatar} = useSelector((state) => state.user);
    return (
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
                options={({ route }) => ({
                    tabBarOptions: { showIcon: true },
                    tabBarIcon: ({ tintColor }) => {
                        return <Image resizeMode="cover" style={{ width: 26, height: 26, borderRadius: 13 }} source={
                            avatar?.uri ? {uri: avatar?.uri} : require('../../assets/images/icons/bottom/profile.png')}/>
                    },
                    tabBarLabel: 'Профиль',
                })}
            />
        </Tab.Navigator>
    )
}



function App() {
    return (
        <NavigationContainer ref={navigationRef}>
            <TabStack />
        </NavigationContainer>
    );
}


export default App;
