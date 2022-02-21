import React, {useCallback} from 'react';
import {MainContainer} from "../../styles/main";
import {Icon, ProfileAvatar} from "../../components";
import {ProfileHeader, ProfilePrivateText} from "../../styles/profile";
import ReservedDesires from "../../components/Profile/ReservedDesires";
import FormGroup from "../../components/Shared/FormGroup";
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native'

export const ProfileContext = React.createContext(undefined)

function ProfileScreen({navigation}) {
    const [data, setData] = React.useState({})
    const handleChangeObject = useCallback(
        (key, value) => setData({...data, [key]: value}),
        [data]
    );
    return (
            <ScrollView style={styles.container}>
                <MainContainer>
                    <ProfileContext.Provider value={{data, handleChangeObject, navigation}}>
                        <ProfileHeader>
                            <Icon style={{width: 18, height: 22}} source={require('../../assets/images/icons/profile/left.png')}/>
                            <ProfileAvatar style={{height: 100, width: 100}}/>
                            <Icon style={{ height: 24, width: 24}} source={require('../../assets/images/icons/profile/settings.png')}/>
                        </ProfileHeader>
                        <ReservedDesires/>
                        <FormGroup forms={[
                            {type: 'input', name: 'Имя'},
                            {type: 'input', name: 'Фамилия'},
                            {type: 'date', name: 'Дата рождения'},
                        ]}/>
                        <FormGroup forms={[
                            {type: 'select', name: 'Телефон'},
                            {type: 'select', name: 'Никнейм'},
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
