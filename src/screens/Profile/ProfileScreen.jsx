import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { MainContainer } from '../../styles/main';
import { Icon, ProfileAvatar } from '../../components';
import { ProfileHeader, ProfilePrivateText } from '../../styles/profile';
import ReservedDesires from '../../components/Profile/ReservedDesires';
import FormGroup from '../../components/Shared/FormGroup';
import { navigateAction } from '../../functions/NavigationService';
import { userCRUD } from '../../http/CRUD';
import { changeUserInfo } from '../../redux/actions/authActions';
import { COLORS } from '../../functions/constants';
import { getUserReservedList } from '../../redux/actions/wishListActions';
import {useI18n} from "../../i18n/i18n";

export const ProfileContext = React.createContext(undefined);

function ProfileScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState({});
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getUserReservedList().then(() => setRefreshing(false));
  }, []);
  const { showActionSheetWithOptions } = useActionSheet();
  const handleChangeObject = useCallback(
    (key, value) => setData({ ...data, [key]: value }),
    [data]
  );

  const t = useI18n()
  const { userInfo, reservedWishList } = useSelector((state) => state.user);

  React.useEffect(() => {
    (async function () {
      await getUserReservedList();
    }());
  }, [navigation]);

  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'flex' } });
  }, [navigation]);

  const handleShowShare = () => {
    showActionSheetWithOptions({
      options: [t('cancel'), t('share')],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateAction('ShareScreen');
      }
    });
  };

  const [firstname, setFirstname] = React.useState(userInfo?.firstname);
  const [secondname, setSecondname] = React.useState(userInfo?.secondname);

  const handleFirstName = async (e) => {
    setFirstname(e);
    await userCRUD.edit(userInfo.id, {
      ...userInfo,
      firstname: e || '',
    }).then(async (response) => {
      await changeUserInfo('userInfo', response?.data);
    });
  };

  const handleSecondName = async (e) => {
    setSecondname(e);
    await userCRUD.edit(userInfo.id, {
      ...userInfo,
      secondname: e || '',
    }).then(async (response) => {
      await changeUserInfo('userInfo', response?.data);
    });
  };

  const params = React.useMemo(
    () => ({ data, handleChangeObject, navigation }),
    [data, handleChangeObject, navigation]
  );

  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
    )}
      style={styles.container}
    >
      <MainContainer>
        <ProfileContext.Provider value={params}>
          <ProfileHeader>
            <Icon handlePressIcon={handleShowShare} style={{ width: 18, height: 22 }} source={require('../../assets/images/icons/profile/left.png')} />
            <ProfileAvatar style={{ height: 100, width: 100, borderRadius: 50 }} />
            <Icon style={{ height: 24, width: 24 }} source={require('../../assets/images/icons/profile/settings.png')} />
          </ProfileHeader>
          <ReservedDesires reservedWishList={reservedWishList} />
          <FormGroup forms={[
            {
              type: 'input', name: t('firstName'), value: firstname, handle: handleFirstName
            },
            {
              type: 'input', name: t('lastName'), value: secondname, handle: handleSecondName
            },
            { type: 'date', name: t('birthday') },
          ]}
          />
          <FormGroup forms={[
            {
              type: 'select', name: t('phoneNumber'),
              value:
                  `${userInfo?.phone[0]}${userInfo?.phone[1]} ${userInfo?.phone[2]}${userInfo?.phone[3]}${userInfo?.phone[4]} ${userInfo?.phone[5]}${userInfo?.phone[6]}${userInfo?.phone[7]} ${userInfo?.phone[8]}${userInfo?.phone[9]} ${userInfo?.phone[10]}${userInfo?.phone[11]}`,
              link: { name: 'ChangePhoneScreen' }
            },
            {
              type: 'select', name: t('nickname'), value: `@${userInfo?.username}`, link: { name: 'ChangeNicknameStep' }
            },
          ]}
          />
          <FormGroup
            last
            forms={[
              { type: 'switch', name: t('profile_privateProfile') },
            ]}
          />
          <ProfilePrivateText>
            {t('profile_wishlistOnlyFriends')}
          </ProfilePrivateText>
        </ProfileContext.Provider>
      </MainContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2
  },
});

export default ProfileScreen;
