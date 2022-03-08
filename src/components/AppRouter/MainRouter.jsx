import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { COLORS } from '../../functions/constants';
import {
  ChangeNicknameStep,
  ChangePhoneScreen,
  DesiresScreen, Friends,
  ImageView,
  MainScreen, ProfileScreen, ShareScreen,
} from '../../screens';
import { navigationRef } from '../../functions/NavigationService';
import Header from '../Header/Header';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="MainProfile">
      <Stack.Screen options={{ headerShown: false }} name="MainProfile" component={ProfileScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ImageView" component={ImageView} />
      <Stack.Screen options={{ headerShown: false }} name="ShareScreen" component={ShareScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ChangePhoneScreen" component={ChangePhoneScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ChangeNicknameStep" component={ChangeNicknameStep} />
      <Stack.Screen options={{ header: (navigation) => <Header title="Зарезервированные желания" navigation={navigation} /> }} name="DesiresScreen" component={DesiresScreen} />
    </Stack.Navigator>
  );
}

function TabStack() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <Tab.Navigator
      initialRouteName="Main"
      tabBarOptions={{
        activeTintColor: COLORS.purple,
      }}
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Friends') {
              return <Image resizeMode="cover" style={{ width: 24, height: 20 }} source={focused ? require('../../assets/images/icons/bottom/friends_active.png') : require('../../assets/images/icons/bottom/friends.png')} />;
            }
            if (route.name === 'Profile') {
              return (
                <Image
                  resizeMode="cover"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderWidth: (userInfo?.avatar && focused) ? 2 : 0,
                    borderColor: (userInfo?.avatar && focused) && '#8424FF'
                  }}
                  source={userInfo?.avatar ? { uri: `https://${userInfo?.avatar}` } : require('../../assets/images/icons/bottom/profile.png')}
                />
              );
            }
            return <Image resizeMode="cover" style={{ width: 24, height: 20 }} source={require('../../assets/images/icons/bottom/friends.png')} />;

          }
        };
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={() => {
          return {
            tabBarOptions: { showIcon: true },
            tabBarLabel: 'Друзья',
          };
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyStack}
        options={() => {
          return {
            tabBarOptions: { showIcon: true },
            tabBarLabel: 'Профиль',
          };
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <TabStack />
    </NavigationContainer>
  );
}

export default App;
