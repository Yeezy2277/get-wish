import {$authHost, $host} from "../../http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {parseError, parseResponse} from "../../http/utils";
import {LOGOUT} from "../constants/userConstants";
import {userCRUD} from "../../http/CRUD";

export const sendCode = async (phone) => {
    try {
        return await $host.post('/api/v1/auth/code/send', {
            phone
        })
    } catch (e) {
        console.log('error', e)
    }
}

export const getUser = async () => {
    try {
         return parseResponse(await $authHost.get('/api/v1/user'))
    } catch (e) {
        console.log('error', e)
    }
}

export const checkCode = async (phone, code) => {
    return new Promise(async function(resolve, reject) {
        await $host.post('/api/v1/auth/code/check', {
            phone,
            code
        }).then(async ({data}) => {
            const {access_token, refresh_token} = data
            await AsyncStorage.setItem('token', access_token)
            await AsyncStorage.setItem('refreshToken', refresh_token)
            resolve()
        }).catch(error => {
            reject(error.response.data)
        })
    })
}

export const logout = () => async (dispatch) => {
    await $authHost.post('/api/v1/user/logout')
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('refreshToken')
    dispatch({type: LOGOUT})
}

export const deleteUser = (userInfo) => async (dispatch) => {
    await userCRUD.delete(userInfo.id)
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('refreshToken')
    dispatch({type: LOGOUT})
}

export const refresh = async () => {
    return new Promise(async function(resolve, reject) {
        await $host.post('/api/v1/auth/token/refresh', {
            refresh_token: await AsyncStorage.getItem('refreshToken')
        }).then(async ({data}) => {
            const {access_token, refresh_token} = data
            await AsyncStorage.setItem('token', access_token)
            await AsyncStorage.setItem('refreshToken', refresh_token)
            console.log('auth')
            resolve()
        }).catch(error => {
            reject(parseError(error))
        })
    })
}
