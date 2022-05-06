import React from 'react';
import { Image, Text, View } from 'native-base';
import {useI18n} from "../../i18n/i18n";

function PrivateAccount() {
    const t = useI18n()
  return (
    <View width="100%" height="300px" marginTop="20%" alignItems="center">
      <Image size="130px" borderRadius="65px" source={require('../../assets/images/icons/users/profile.png')} />
      <Text textAlign="center" fontSize="18px" fontWeight="bold" marginTop="40px">Этот аккаунт приватный</Text>
      <Text maxWidth="276px" textAlign="center" fontSize="14px" marginTop="11px">
          {t('profile_friendshipRequired')}
      </Text>
    </View>
  );
}

export default PrivateAccount;
