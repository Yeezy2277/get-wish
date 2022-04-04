import React from 'react';
import {Container} from "../../styles/main";
import {Button} from "react-native";
import {deleteUser, logout} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import {useI18n} from "../../i18n/i18n";

function MainScreen(props) {
    const { navigation } = props;
    const {userInfo} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        await dispatch(logout())
        navigation.navigate('AuthNavigator', { screen: 'Auth' })
    }
    const deleteHandler = async () => {
        await dispatch(deleteUser(userInfo))
        navigation.navigate('AuthNavigator', { screen: 'Auth' })
    }

    const t = useI18n();

    return (
        <Container>
            <Button title={t('logout')} onPress={logoutHandler}/>
            <Button title={t('deleteAccount')} onPress={deleteHandler}/>
        </Container>
    );
}

export default MainScreen;
