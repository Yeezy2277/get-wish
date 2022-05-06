import React from 'react';
import {
  Box, Heading
} from 'native-base';
import { View } from 'react-native';
import { COLORS } from '../../../functions/constants';
import ListRequestElement from './ListRequestElement';
import {useI18n} from "../../../i18n/i18n";

function ListRequest({ data, title }) {
    const t = useI18n()
  return (
    <Box width="100%">
      <Heading pl="20px" fontSize="15px" pb="19px" color={COLORS.gray}>
          { title || '5 ' + t('friend_plurals', { returnObjects: true })[2]}
      </Heading>
      <View style={{ flex: 1 }}>
        <ListRequestElement data={data} />
      </View>
    </Box>
  );
}

export default ListRequest;
