import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout, refresh} from "../redux/actions/authActions";
import NavigationService from "../functions/NavigationService";
import store from '../redux/index'
import {LOGOUT, SET_NICKNAME} from "../redux/constants/userConstants";
import useToasts from "../hooks/useToast";
import {Alert} from "react-native";

const {dispatch} = store


const $host = axios.create({
  baseURL: 'https://dev.wish.mediapark.com.ru'
})

const $authHost = axios.create({
  baseURL: 'https://dev.wish.mediapark.com.ru'
})

const authIntterceptor = async config => {
  config.headers.authorization = `Bearer ${await AsyncStorage.getItem('token')}`
  return config
}

$authHost.interceptors.response.use(response => {
  return response;
}, async error => {
  if (error.response.status === 401) {
    await refresh().catch(async () => {
      if (await AsyncStorage.getItem('token') || await AsyncStorage.getItem('refreshToken') || store.getState('user')?.user?.isAuth ) {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('refreshToken')
        dispatch({type: LOGOUT})
        dispatch({type: SET_NICKNAME, payload: false})
        NavigationService.navigate('Start')
      }
    })
  }
  throw error
})



$authHost.interceptors.request.use(authIntterceptor)

export {
  $host,
  $authHost,
}
