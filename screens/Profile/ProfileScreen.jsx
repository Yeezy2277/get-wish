import React, {useCallback} from 'react';
import {MainContainer} from "../../styles/main";
import {Icon, ProfileAvatar} from "../../components";
import {ProfileHeader, ProfilePrivateText} from "../../styles/profile";
import ReservedDesires from "../../components/Profile/ReservedDesires";
import FormGroup from "../../components/Shared/FormGroup";
import {ScrollView, StyleSheet} from 'react-native'
import {useSelector} from "react-redux";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {navigateAction} from "../../functions/NavigationService";

export const ProfileContext = React.createContext(undefined)

function ProfileScreen({navigation}) {
    const [data, setData] = React.useState({})
    const { showActionSheetWithOptions } = useActionSheet();
    const handleChangeObject = useCallback(
        (key, value) => setData({...data, [key]: value}),
        [data]
    );
    const {userInfo} = useSelector((state) => state.user);

    React.useEffect(() => {
        const parent = navigation.getParent()
        parent.setOptions({tabBarStyle: {display: 'flex'}})
    }, [navigation])

    const handleShowShare = () => {
        showActionSheetWithOptions(
            {
                options: ["Отмена", "Поделиться"],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            }, async (buttonIndex) => {
                if (buttonIndex === 1) {
                    navigateAction('ShareScreen')
                }
            })
    }

    return (
            <ScrollView style={styles.container}>
                <MainContainer>
                    <ProfileContext.Provider value={{data, handleChangeObject, navigation}}>
                        <ProfileHeader>
                            <Icon handlePressIcon={handleShowShare} style={{width: 18, height: 22}} source={require('../../assets/images/icons/profile/left.png')}/>
                            <ProfileAvatar style={{height: 100, width: 100, borderRadius: 50}}/>
                            <Icon style={{ height: 24, width: 24}} source={require('../../assets/images/icons/profile/settings.png')}/>
                        </ProfileHeader>
                        <ReservedDesires/>
                        <FormGroup forms={[
                            {type: 'input', name: 'Имя'},
                            {type: 'input', name: 'Фамилия'},
                            {type: 'date', name: 'Дата рождения'},
                        ]}/>
                        <FormGroup forms={[
                            {type: 'select', name: 'Телефон', value: userInfo?.phone},
                            {type: 'select', name: 'Никнейм', value: `@${userInfo?.username}`},
                        ]}/>
                        <FormGroup last forms={[
                            {type: 'switch', name: 'Приватный профиль'},
                        ]}/>
                        <ProfilePrivateText>Включи, если хочешь, чтобы твои вишлисты, желания и посты могли видеть только друзья</ProfilePrivateText>
                    </ProfileContext.Provider>
                </MainContainer>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
});

export default ProfileScreen;
