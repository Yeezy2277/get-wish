import React from 'react';
import {
  Box
} from 'native-base';
import ListFriendMinusElement from './ListFriendMinusElement';

function ListFriendsMinus({
  data, add, handleSearchPanel, handlePress, padding, deleteFriendFromLocalHandler
}) {
  return (
    <Box paddingLeft={padding ? '20px' : '0px'} width="100%">
      <ListFriendMinusElement
        data={data}
        handlePress={handlePress}
        add={add}
        deleteFriendFromLocalHandler={deleteFriendFromLocalHandler}
        handleSearchPanel={handleSearchPanel}
      />
    </Box>
  );
}

export default ListFriendsMinus;
