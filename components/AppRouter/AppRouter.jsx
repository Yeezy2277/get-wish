import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {refresh} from "../../redux/actions/authActions";
import {userCRUD} from "../../http/CRUD";
import {SET_AUTH, SET_USER_INFO} from "../../redux/constants/userConstants";
import {Text} from "react-native";
import MainRouter from "./MainRouter";
import AuthRouter from "./AuthRouter";

function AppRouter() {
    const {isAuth} = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [nickname, setNickname] = React.useState(false)

    React.useEffect(() => {
        (async function () {
            setLoading(true)
            await refresh().then(async () => {
                const user = await userCRUD.search()
                if (user) {
                    dispatch({type: SET_USER_INFO, payload: user})
                    if (!user?.username)
                        setNickname(true)
                    else {
                        dispatch({type: SET_AUTH, payload: true})
                    }
                }
            }).finally(async () => await setLoading(false))
        }())
    }, [])

    if (loading) {
        return <Text>Загрузка</Text>
    }

    return (
        <>
            {isAuth && <MainRouter screenProps={{nextStart: 'Main'}}/>}
            {!isAuth && <AuthRouter screenProps={{nickname, nextStart: 'Auth'}}/>}
        </>
    );
}

export default AppRouter;
