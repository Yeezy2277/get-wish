import React from 'react';
import { Image, Text, View } from 'native-base';

function PrivateAccount() {
  return (
    <View width="100%" height="264px" marginTop="20%" alignItems="center">
      <Image size="130px" borderRadius="65px" source={require('../../assets/images/icons/users/profile.png')} />
      <Text textAlign="center" fontSize="18px" fontWeight="bold" marginTop="40px">Этот аккаунт приватный</Text>
      <Text maxWidth="276px" textAlign="center" fontSize="14px" marginTop="11px">
        Отправь
        ему запрос в друзья, чтобы получить доступ к его вишлистам, желаниям и постам
      </Text>
    </View>
  );
}

export default PrivateAccount;
