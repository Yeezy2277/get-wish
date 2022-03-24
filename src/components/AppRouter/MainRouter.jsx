import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Toast from 'react-native-toast-message';
import { Box, Text } from 'native-base';
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
import {
  ban, cancelRequest, deleteFriend, onChangeSearch, sendRequest
} from '../../redux/actions/userActions';
import { goBack, goToShareScreen, toastConfig } from '../../functions/helpers';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import { DELETE_ID_FROM_DATA, SET_SEARCH_DATA } from '../../redux/constants/userConstants';

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
  const { showActionSheetWithOptions } = useActionSheet();

  const dispatch = useDispatch();

  const showMore = async () => {
    const optionNameFunc = async () => {
      if (oneUser?.is_friend && !oneUser?.has_outgoing_friend_request) {
        return 'Удалить из друзей';
      }
      if (oneUser?.has_outgoing_friend_request && !oneUser?.is_friend) {
        return 'Отменить запрос';
      }
      return 'Добавить в друзья';
    };
    const optionName = await optionNameFunc();
    showActionSheetWithOptions(
      {
        options: ['Отмена', 'Поделиться', optionName, 'Заблокировать'],
        title: 'Что ты хочешь сделать с этим аккаунтом?',
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
        userInterfaceStyle: 'dark'
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          goToShareScreen();
        } else if (buttonIndex === 2) {
          if (!oneUser?.is_friend && !oneUser?.has_outgoing_friend_request) {
            await sendRequest(oneUser?.id, 'PROFILE').then(() => {
              Toast.show({
                type: 'search',
                text1: 'Запрос на дружбу отправлен',
                position: 'bottom',
                bottomOffset: 95,
              });
            });
          }
          if (oneUser?.has_outgoing_friend_request && !oneUser?.is_friend) {
            await cancelRequest(oneUser?.id, 'PROFILE');
          }
          if (oneUser?.is_friend && !oneUser?.has_outgoing_friend_request) {
            showActionSheetWithOptions({
              options: ['Отмена', 'Удалить'],
              title: 'Удалить аккаунт из друзей?',
              message: !oneUser?.private ? 'Удалить аккаунт из друзей. Тебе придётся отправить запрос на дружбу, чтобы снова стать друзьями'
                : 'Аккаунт этого пользователя приватный. Ты не сможешь просматривать его, если удалишь.',
              cancelButtonIndex: 0,
              destructiveButtonIndex: 1,
              userInterfaceStyle: 'dark'
            }, async (buttonIndex) => {
              if (buttonIndex === 1) {
                await deleteFriend(oneUser?.id);
              }
            });
          }

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
            if (buttonIndex === 1) {
              await ban(oneUser?.id).then(async () => {
                dispatch({
                  type: DELETE_ID_FROM_DATA,
                  payload: oneUser?.id
                });
                await searchPanelHandler(true);
                await goBack();
              });
            }
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
  const { userInfo, incomingRequest } = useSelector((state) => state.user);
  const all = React.useCallback(() => {
    return incomingRequest
      ?.reduce((total, amount) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!amount.hasOwnProperty('status')) {
          total += 1;
        }
        return total;
      }, 0);
  }, [incomingRequest]);
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
              return (
                <>
                  <Image
                    resizeMode="cover"
                    style={{ width: 24, height: 20, position: 'relative' }}
                    source={focused ? require('../../assets/images/icons/bottom/friends_active.png')
                      : require('../../assets/images/icons/bottom/friends.png')}
                  />
                  {all() ? (
                    <Box
                      right={10}
                      top="10%"
                      size={18}
                      justifyContent="center"
                      alignItems="center"
                      backgroundColor={COLORS.red}
                      borderRadius={9}
                      position="absolute"
                    >
                      <Text color={COLORS.white} fontWeight="bold" fontSize="10px">{all()}</Text>
                    </Box>
                  ) : null}
                </>
              );
            }
            if (route.name === 'Profile') {
              return (
                <Image
                  resizeMode="cover"
                  style={{
                    position: 'relative',
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderWidth: (userInfo?.avatar && focused) ? 2 : 0,
                    borderColor: (userInfo?.avatar && focused) && '#8424FF'
                  }}
                  source={userInfo?.avatar ? { uri: `${userInfo?.avatar}` } : require('../../assets/images/icons/bottom/profile.png')}
                />
              );
            }
            return <Image resizeMode="cover" style={{ width: 24, height: 20, position: 'relative' }} source={require('../../assets/images/icons/bottom/friends.png')} />;

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
