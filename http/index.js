import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// $authHost.interceptors.response.use(response => {
//   return response;
// }, async error => {
//   if (error.response.status === 401) {
//     // return await refresh()
//   }
//   throw error;
// })

$authHost.interceptors.request.use(authIntterceptor)

export {
  $host,
  $authHost,
}
