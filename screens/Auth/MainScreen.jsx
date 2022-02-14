import React from 'react';
import {Container} from "../../styles/main";
import {Button} from "react-native";
import {deleteUser, logout} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";

function MainScreen(props) {
    const { navigation } = props;
    const {userInfo} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        await dispatch(logout())
        navigation.navigate('AuthNavigator', { screen: 'Start' })
    }
    const deleteHandler = async () => {
        await dispatch(deleteUser(userInfo))
        navigation.navigate('AuthNavigator', { screen: 'Start' })
    }
    return (
        <Container>
            <Button title="Выйти из аккаунта" onPress={logoutHandler}/>
            <Button title="Удалить аккаунт" onPress={deleteHandler}/>
        </Container>
    );
}

export default MainScreen;
