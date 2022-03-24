import React from 'react';
import {
  Box, Heading
} from 'native-base';
import { View } from 'react-native';
import { COLORS } from '../../../functions/constants';
import ListQueryElement from './ListQueryElement';

function ListQuery({ title, data }) {
  return (
    <Box width="100%">
      <Heading pl="20px" fontSize="15px" pb="19px" color={COLORS.gray}>
        { title || '5 друзей'}
      </Heading>
      <View style={{ flex: 1 }}>
        <ListQueryElement data={data} />
      </View>
    </Box>

  );
}

export default ListQuery;
