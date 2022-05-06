import React from 'react';
import {
  Avatar, Box, Button, HStack, Image, Pressable, Text, VStack
} from 'native-base';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../functions/constants';
import { acceptFriend, cancelFriend } from '../../../redux/actions/userActions';
import AuthButton from '../../Shared/AuthButton';
import { changeUserInfo } from '../../../redux/actions/authActions';
import { goToUserProfile } from '../../../functions/helpers';
import { userCRUD } from '../../../http/CRUD';
import SharedButton from '../../Shared/SharedButton';
import {useI18n} from "../../../i18n/i18n";

function ListRequestElement({ data, first = false, handleSearchPanel }) {
  const { search } = useSelector((state) => state.user);
  const t = useI18n()
  const handleGoToUser = async (item) => {
    const user = await userCRUD.get(item?.id);
    await changeUserInfo('oneUser', user?.data);
    if (search) {
      await goToUserProfile();
      const close = await handleSearchPanel();
      await close(false);
    } else {
      await goToUserProfile({ noSearch: true });
    }
  };
  return (
    <FlatList
      data={data}
      style={{
        marginBottom: first ? 30 : 100, paddingLeft: 20, paddingRight: 20, flexGrow: first ? 0 : 1
      }}
      renderItem={({
        item
      }) => (
        <Box
          pb="30px"
        >
          <HStack space={3}>
            <Pressable onPress={() => handleGoToUser(item)}>
              <Avatar
                size="62px"
                source={item?.avatar ? {
                  uri: `${item?.avatar}`
                } : require('../../../assets/images/icons/profile/avatar.png')}
              />
            </Pressable>
            <VStack flex={1}>
              <Pressable onPress={() => handleGoToUser(item)}>
                <Text
                  color={COLORS.black}
                  fontSize="14px"
                  fontWeight="600"
                >
                  {item.username}
                </Text>
              </Pressable>
              <HStack marginTop="10px" space={3} alignItems="center">
                {item.status !== 'rejected' && item.status !== 'sent' && (
                  <>
                    <SharedButton
                      textStyle={{ fontSize: 15, lineHeight: 21 }}
                      onPress={() => cancelFriend(item?.id, first ? 'SEARCH_IN' : 'REQUEST')}
                    >
                      Отклонить
                    </SharedButton>

                    <AuthButton
                      higlightStyle={{ height: 30 }}
                      lineHeightText={27}
                      onPress={() => acceptFriend(item?.id)}
                      style={{
                        height: 30,
                        width: 120,
                        maxWidth: 120,
                        borderRadius: 10,
                      }}
                      variant="small"
                      text={t('accept')}
                    />
                  </>
                )}
                {item.status === 'rejected' && (
                  <>
                    <Image width="9px" height="9px" source={require('../../../assets/images/icons/friends/cancel.png')} />
                    <Text fontSize={12} fontWeight="600" color={COLORS.gray}>{t('friends_requestCanceled')}</Text>
                  </>
                )}
                {item.status === 'sent' && (
                  <>
                    <Image width="11px" height="10px" source={require('../../../assets/images/icons/friends/check.png')} />
                    <Text fontSize={12} fontWeight="600" color={COLORS.gray}>{t('friends_requestAccepted')}</Text>
                    <Text marginLeft="14px" fontSize={12} fontWeight="700" color={COLORS.purple}>{t('sendMessage')}</Text>
                  </>
                )}
              </HStack>
            </VStack>
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ListRequestElement;
