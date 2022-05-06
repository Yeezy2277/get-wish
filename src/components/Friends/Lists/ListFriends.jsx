import React from 'react';
import {
  Box, Heading, View
} from 'native-base';
import { COLORS } from '../../../functions/constants';
import ListFriendElement from './ListFriendElement';
import {useI18n} from "../../../i18n/i18n";

function ListFriends({
  title, data, add, handleSearchPanel, handlePress
}) {
    const t = useI18n()
  return (
    <Box width="100%" flex="1">
      <Heading fontSize="15px" pb="19px" pl="20px" color={COLORS.gray}>
        { title || '5 ' + t('friend_plurals', { returnObjects: true })[2]}
      </Heading>
      <View style={{ flex: 1 }}>
        <ListFriendElement
          data={data}
          handlePress={handlePress}
          add={add}
          handleSearchPanel={handleSearchPanel}
        />
      </View>
    </Box>
  );
}

export default ListFriends;
