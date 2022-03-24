import React from 'react';
import {
  Box, Heading, View
} from 'native-base';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../functions/constants';
import ListFriendElement from './ListFriendElement';

function ListFriends({
  title, data, add, handleSearchPanel
}) {
  return (
    <Box width="100%" flex="1" zIndex={9}>
      <Heading fontSize="15px" pb="19px" pl="20px" color={COLORS.gray}>
        { title || '5 друзей'}
      </Heading>
      <ListFriendElement
        data={data}
        add={add}
        handleSearchPanel={handleSearchPanel}
      />
    </Box>
  );
}

export default ListFriends;
