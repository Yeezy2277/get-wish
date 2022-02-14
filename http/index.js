import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout, refresh} from "../redux/actions/authActions";
import NavigationService from "../functions/NavigationService";
import store from '../redux/index'
import {LOGOUT} from "../redux/constants/userConstants";

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
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('refreshToken')
      dispatch({type: LOGOUT})
      NavigationService.navigate('Start')
    })
  }
  throw error;
})

$authHost.interceptors.request.use(authIntterceptor)

export {
  $host,
  $authHost,
}
