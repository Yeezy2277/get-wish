import React from 'react';
import {
  Box, Heading, View
} from 'native-base';
import { COLORS } from '../../../functions/constants';
import ListFriendElement from './ListFriendElement';

function ListFriends({
  title, data, add, handleSearchPanel, handlePress
}) {
  return (
    <Box width="100%" flex="1">
      <Heading fontSize="15px" pb="19px" pl="20px" color={COLORS.gray}>
        { title || '5 друзей'}
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
