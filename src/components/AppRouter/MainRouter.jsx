import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Toast from 'react-native-toast-message';
import { COLORS } from '../../functions/constants';
import {
  ChangeNicknameStep,
  ChangePhoneScreen,
  DesiresScreen, Friends,
  ImageView,
  MainScreen, ProfileScreen, ShareScreen, UserPost, UserProfile, UserWishList,
} from '../../screens';
import { navigationRef } from '../../functions/NavigationService';
import Header from '../Header/Header';
import { sendRequest } from '../../redux/actions/userActions';
import { goToShareScreen, toastConfig } from '../../functions/helpers';

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

function FriendsStack() {
  const { oneUser, search } = useSelector((state) => state.user);
  console.log('search', search);
  const { showActionSheetWithOptions } = useActionSheet();

  const showMore = () => {
    showActionSheetWithOptions(
      {
        options: ['Отмена', 'Поделиться', 'Добавить в друзья', 'Заблокировать'],
        title: 'Что ты хочешь сделать с этим аккаунтом?',
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
        userInterfaceStyle: 'dark'
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          goToShareScreen();
        } else if (buttonIndex === 2) {
          Toast.show({
            type: 'search',
            text1: 'Запрос на дружбу отправлен',
            position: 'bottom',
            bottomOffset: 95,
          });
        } else if (buttonIndex === 3) {
          showActionSheetWithOptions({
            options: ['Отмена', 'Заблокировать'],
            title: 'Заблокировать аккаунт?',
            message: 'Этот пользователь больше не сможет находить твой аккаунт,'
                  + ' смотреть твои посты и вишлисты и отправлять заявки на добавление в друзья',
            cancelButtonIndex: 0,
            destructiveButtonIndex: 1,
            userInterfaceStyle: 'dark'
          }, async (buttonIndex) => {

          });
        }
      }
    );
  };

  return (
    <Stack.Navigator initialRouteName="UserFriends">
      <Stack.Screen options={{ headerShown: false }} name="UserFriends" component={Friends} />
      <Stack.Screen options={{ header: (navigation) => <Header search={!!search} morePress={showMore} more title={oneUser?.username} navigation={navigation} /> }} name="UserProfile" component={UserProfile} />
      <Stack.Screen options={{ header: (navigation) => <Header avatar title="Посты" navigation={navigation} /> }} name="UserPost" component={UserPost} />
      <Stack.Screen options={{ headerShown: false }} name="UserWishList" component={UserWishList} />
      <Stack.Screen options={{ headerShown: false }} name="ShareScreen" component={ShareScreen} />
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
        component={FriendsStack}
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
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
