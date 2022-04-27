import React from 'react';
import {
  Box, Heading, View
} from 'native-base';
import { COLORS } from '../../../functions/constants';
import ListFriendElement from './ListFriendElement';
import { ListFriendCheckElement } from '../../index';

function ListFriendsCheck({
  data, add, handleSearchPanel, handlePress, selecteds, setSelected, padding
}) {
  return (
    <Box paddingLeft={padding ? '20px' : '0px'} width="100%" flex="1">
      <View style={{ flex: 1 }}>
        <ListFriendCheckElement
          selecteds={selecteds}
          setSelected={setSelected}
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
