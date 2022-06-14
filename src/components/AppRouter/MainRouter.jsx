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
  AddWish,
  AddWishList,
  ChangeNicknameStep,
  ChangePhoneScreen,
  DesiresScreen, Friends,
  ImageView,
  MainScreen, Posts, ProfileScreen,
  ProfileWishList, ShareScreen, SwiperImage, UserPost, UserProfile, UserWishList,
} from '../../screens';
import { navigationRef } from '../../functions/NavigationService';
import Header from '../Header/Header';
import {
  ban, cancelRequest, deleteFriend, sendRequest
} from '../../redux/actions/userActions';
import { goBack, goToShareScreen } from '../../functions/helpers';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import { DELETE_ID_FROM_DATA } from '../../redux/constants/userConstants';
import ArchiveWishList from '../../screens/WishList/ArchiveWishList';
import ReservWishList from '../../screens/WishList/ReservWishList';
import { useI18n } from '../../i18n/i18n';
import AddPost from '../../screens/Posts/AddPost';
import MyPost from '../../screens/Posts/MyPost';
import Comments from '../Posts/Comments';
import Likes from '../../screens/Posts/Likes';
import PostUserOthere from '../../screens/Posts/PostUserOthere';

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
      <Stack.Screen options={{ headerShown: false }} name="ReservWishList" component={ReservWishList} />
      <Stack.Screen options={{ headerShown: false }} name="Swiper" component={SwiperImage} />
    </Stack.Navigator>
  );
}

function PostsStack() {
  const { oneUser, search } = useSelector((state) => state.user);
  const { showActionSheetWithOptions } = useActionSheet();

  const t = useI18n();
  const dispatch = useDispatch();

  const showMore = async () => {
    const optionNameFunc = async () => {
      if (oneUser?.is_friend && !oneUser?.has_outgoing_friend_request) {
        return t('friends_delete_friend');
      }
      if (oneUser?.has_outgoing_friend_request && !oneUser?.is_friend) {
        return t('friends_cancel');
      }
      return t('friends_add_friend');
    };
    const optionName = await optionNameFunc();
    showActionSheetWithOptions(
      {
        options: [
          t('cancel'),
          t('share'),
          optionName,
          t('ban'),
        ],
        title: t('profile_account_action'),
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
                text1: t('friends_request_was_sent'),
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
              options: [
                t('cancel'),
                t('delete'),
              ],
              title: t('friends_delete_friend'),
              message: !oneUser?.private
                ? t('friends_delete_info_public')
                : t('friends_delete_info_private'),
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
            options: [
              t('cancel'),
              t('ban'),
            ],
            title: t('profile_account_ban'),
            message: t('profile_account_ban_info'),
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
                await searchPanelHandler();
                await goBack();
              });
            }
          });
        }
      }
    );
  };

  return (
    <Stack.Navigator initialRouteName="PostsUser">
      <Stack.Screen options={{ headerShown: false }} name="PostsUser" component={Posts} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddPost"
        component={AddPost}
      />
      <Stack.Screen options={{ header: (navigation) => <Header search={!!search} morePress={showMore} more title={oneUser?.username} navigation={navigation} /> }} name="UserProfile" component={UserProfile} />
      <Stack.Screen options={{ headerShown: false }} name="Swiper" component={SwiperImage} />
      <Stack.Screen options={{ header: (navigation) => <Header title="Мои посты" navigation={navigation} /> }} name="MyPost" component={MyPost} />
      <Stack.Screen options={{ header: (navigation) => <Header title="Комментарии" navigation={navigation} /> }} name="Comments" component={Comments} />
      <Stack.Screen options={{ header: (navigation) => <Header title="Нравится" navigation={navigation} /> }} name="Likes" component={Likes} />
      <Stack.Screen options={{ headerShown: false }} name="ShareScreen" component={ShareScreen} />
    </Stack.Navigator>
  );
}

function FriendsStack() {
  const { oneUser, search } = useSelector((state) => state.user);
  const { showActionSheetWithOptions } = useActionSheet();

  const t = useI18n();
  const dispatch = useDispatch();

  const showMore = async () => {
    const optionNameFunc = async () => {
      if (oneUser?.is_friend && !oneUser?.has_outgoing_friend_request) {
        return t('friends_delete_friend');
      }
      if (oneUser?.has_outgoing_friend_request && !oneUser?.is_friend) {
        return t('friends_cancel');
      }
      return t('friends_add_friend');
    };
    const optionName = await optionNameFunc();
    showActionSheetWithOptions(
      {
        options: [
          t('cancel'),
          t('share'),
          optionName,
          t('ban'),
        ],
        title: t('profile_account_action'),
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
                text1: t('friends_request_was_sent'),
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
              options: [
                t('cancel'),
                t('delete'),
              ],
              title: t('friends_delete_friend'),
              message: !oneUser?.private
                ? t('friends_delete_info_public')
                : t('friends_delete_info_private'),
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
            options: [
              t('cancel'),
              t('ban'),
            ],
            title: t('profile_account_ban'),
            message: t('profile_account_ban_info'),
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
                await searchPanelHandler();
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
      <Stack.Screen options={{ header: (navigation) => <Header avatar title={t('profile_posts')} navigation={navigation} /> }} name="UserPost" component={UserPost} />
      <Stack.Screen options={{ headerShown: false }} name="UserWishList" component={UserWishList} />
      <Stack.Screen options={{ headerShown: false }} name="ShareScreen" component={ShareScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Swiper" component={SwiperImage} />
      <Stack.Screen options={{ header: (navigation) => <Header title="Посты" navigation={navigation} /> }} name="UserPostOther" component={PostUserOthere} />
      <Stack.Screen options={{ header: (navigation) => <Header title="Комментарии" navigation={navigation} /> }} name="Comments" component={Comments} />
      <Stack.Screen options={{ header: (navigation) => <Header title="Нравится" navigation={navigation} /> }} name="Likes" component={Likes} />

    </Stack.Navigator>
  );
}

function WishListStack() {
  const t = useI18n();
  return (
    <Stack.Navigator initialRouteName="WishList">
      <Stack.Screen options={{ headerShown: false }} name="ImageView" component={ImageView} />
      <Stack.Screen options={{ header: (navigation) => <Header archive cancel={false} title={t('wishlists')} navigation={navigation} /> }} name="WishList" component={ProfileWishList} />
      <Stack.Screen options={{ header: (navigation) => <Header title={t('wishlists_archived')} navigation={navigation} /> }} name="ArchiveWishList" component={ArchiveWishList} />
      <Stack.Screen
        options={{
          header: (navigation) => {
            const idEdit = navigation?.route?.params?.id;
            return <Header cancelText cancel={false} title={idEdit ? t('edit') : t('wishlists_create_new')} navigation={navigation} />;
          },
          tabBarStyle: { display: 'none' }
        }}
        name="AddWishList"
        component={AddWishList}
      />
      <Stack.Screen options={{ headerShown: false, tabBarStyle: { display: 'none' } }} name="ShareScreen" component={ShareScreen} />
      <Stack.Screen options={{ headerShown: false }} name="UserWishList" component={UserWishList} />
      <Stack.Screen options={{ headerShown: false }} name="Swiper" component={SwiperImage} />
      <Stack.Screen
        options={{
          header: (navigation) => {
            const idEdit = navigation?.route?.params?.id;
            return <Header cancelText cancel={false} title={idEdit ? t('edit') : t('wishlists_add_wish')} navigation={navigation} />;
          },
          tabBarStyle: { display: 'none' }
        }}
        name="AddWish"
        component={AddWish}
      />
    </Stack.Navigator>
  );
}

function TabStack() {
  const { userInfo, incomingRequest } = useSelector((state) => state.user);
  const t = useI18n();
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
                      right={4}
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
            if (route.name === 'WishLists') {
              return (
                <Image
                  resizeMode="cover"
                  style={{ width: 28, height: 28, position: 'relative' }}
                  source={focused ? require('../../assets/images/icons/bottom/wishlist_active.png')
                    : require('../../assets/images/icons/bottom/wishlist.png')}
                />
              );
            }

            if (route.name === 'Posts') {
              return (
                <Image
                  resizeMode="cover"
                  style={{ width: 22, height: 22, position: 'relative' }}
                  source={focused ? require('../../assets/images/icons/bottom/posts_active.png')
                    : require('../../assets/images/icons/bottom/posts.png')}
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
        name="Posts"
        component={PostsStack}
        options={() => {
          return {
            tabBarOptions: { showIcon: true },
            tabBarLabel: 'Посты',
          };
        }}
      />
      <Tab.Screen
        name="WishLists"
        component={WishListStack}
        options={() => {
          return {
            tabBarOptions: { showIcon: true },
            tabBarLabel: t('wishlists'),
          };
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsStack}
        options={() => {
          return {
            tabBarOptions: { showIcon: true },
            tabBarLabel: t('friends'),
          };
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyStack}
        options={() => {
          return {
            tabBarOptions: { showIcon: true },
            tabBarLabel: t('profile'),
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
