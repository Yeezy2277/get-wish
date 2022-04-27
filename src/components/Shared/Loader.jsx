import React from 'react';
import { Box, Spinner } from 'native-base';
import { COLORS } from '../../functions/constants';

function Loader() {
  return (
    <Box height="100%" justifyContent="center" alignItems="center">
      <Spinner color={COLORS.purple} size="lg" />
    </Box>
  );
}

export default Loader;
