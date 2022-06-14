import React from 'react';
import {
  Avatar, HStack, Image, Pressable, Text, View, VStack
} from 'native-base';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import TextParser from '../Shared/TextParser';
import { COLORS } from '../../functions/constants';
import { convertComment } from '../../functions/dates2';
import { ActionSheets } from '../../functions/ActionSheet';
import { useI18n } from '../../i18n/i18n';

function CommentsBody({ el }) {
  const { userInfo } = useSelector((state) => state.user);
  const [isYourComment, setIsYourComment] = React.useState(false);
  const t = useI18n();
  const { showActionSheetWithOptions } = useActionSheet();
  const state = new ActionSheets(t, showActionSheetWithOptions);
  React.useEffect(() => {
    if (userInfo.id === el?.user.id) {
      setIsYourComment(true);
    }
  }, [el?.user.id, userInfo.id]);
  return (
    <View
      key={el.id}
      paddingTop="8px"
      paddingLeft="12px"
      paddingRight="15px"
      paddingBottom="8px"
    >
      <HStack space={3}>
        <Pressable>
          <Avatar
            marginTop="3px"
            size="26px"
            source={el?.user?.avatar ? { uri: el?.user?.avatar }
              : require('../../assets/images/icons/profile/avatar.png')}
          />
        </Pressable>
        <VStack flex={1}>
          <Text>
            <Text
              fontFamily="NunitoBold"
              fontSize="14px"
              fontWeight="700"
            >
              {el?.user?.username}
              {'  '}
            </Text>
            <TextParser description={el?.text} />
          </Text>
          <Text
            marginTop="10px"
            color={COLORS.gray}
            fontSize="12px"
            fontWeight="400"
          >
            {convertComment(el.updated_at)}
          </Text>
        </VStack>
        {isYourComment ? (
          <Pressable
            onPress={() => state.showActionComment(el?.id)}
            marginLeft="auto"
            paddingRight="10px"
            width="20px"
            height="20px"
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Image alt="image" resizeMode="cover" width="3px" height="15px" source={require('../../assets/images/icons/profile/desires/menu.png')} />
          </Pressable>
        ) : null}
      </HStack>
    </View>
  );
}

export default CommentsBody;
