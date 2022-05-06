import React from 'react';
import {
  Box, View
} from 'native-base';
import { ListFriendCheckElement } from '../../index';

function ListFriendsCheck({
  data, add, handleSearchPanel, handlePress, padding
}) {
  return (
    <Box paddingLeft={padding ? '20px' : '0px'} maxHeight="70%" flex="1" width="100%">
      <View style={{ flex: 1 }}>
        <ListFriendCheckElement
          data={data}
          handlePress={handlePress}
          add={add}
          handleSearchPanel={handleSearchPanel}
        />
      </View>
    </Box>
  );
}

export default ListFriendsCheck;
