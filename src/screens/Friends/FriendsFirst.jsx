import React from 'react';
import { ScrollView, Text } from 'native-base';
import { COLORS } from '../../functions/constants';
import { FriendsContainerFirst, FriendsImageEmpty } from '../../styles/friends';
import AuthButton from '../../components/Shared/AuthButton';
import { searchPanelHandler } from '../../redux/actions/genericActions';

function FriendsFirst() {
  const openPanel = async () => {
    await searchPanelHandler(true);
  };
  return (
    <ScrollView height="100%" width="100%" paddingTop="30px" backgroundColor={COLORS.white2}>
      <FriendsContainerFirst>
        <FriendsImageEmpty resizeMode="cover" source={require('../../assets/images/icons/friends/empty_friends.png')} />
        <Text color={COLORS.black} marginTop="14px" fontWeight="bold" fontSize="18px" lineHeight="25px">Куда все подевались?</Text>
        <Text color={COLORS.gray} marginTop="11px" fontSize="14px" lineHeight="20px">Кажется, ты ещё ни с кем не подружился</Text>
        <AuthButton
          style={{
            zIndex: 999, display: 'flex', width: 172, marginTop: 40
          }}
          onPress={openPanel}
          variant="small"
          text="Найти друзей"
        />
      </FriendsContainerFirst>
    </ScrollView>
  );
}

export default FriendsFirst;
