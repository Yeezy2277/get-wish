import React from 'react';
import { Box, Image, Text } from 'native-base';
import { COLORS } from '../../functions/constants';
import AuthButton from '../../components/Shared/AuthButton';

function ButtonReserved({ onPress, countRes }) {
  const RenderResImage = React.useCallback((count, cancel = false) => {
    if (count === 0) {
      return (
        <Image
          marginRight="20px"
          source={cancel ? require('../../assets/images/icons/wishlist/reserv3Cancel.png')
            : require('../../assets/images/icons/wishlist/reserv3.png')}
          height="20px"
          zIndex={999}
          width="30px"
        />
      );
    }
    if (count === 1) {
      return (
        <Image
          marginRight="20px"
          source={cancel ? require('../../assets/images/icons/wishlist/reserv2Cancel.png')
            : require('../../assets/images/icons/wishlist/reserv2.png')}
          height="20px"
          zIndex={999}
          width="30px"
        />
      );
    }
    if (count === 2) {
      return (
        <Image
          marginRight="20px"
          source={cancel ? require('../../assets/images/icons/wishlist/reserv1Cancel.png')
            : require('../../assets/images/icons/wishlist/reserv1.png')}
          height="20px"
          zIndex={999}
          width="30px"
        />
      );
    }
  }, [countRes]);
  return (
    <AuthButton
      onPress={onPress}
      style={{
        height: 50, marginBottom: 10, alignSelf: 'center', marginTop: 30
      }}
      higlightStyle={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
      }}
      active
    >
      <Box width="100%" height="53px" display="flex" alignItems="center" flexDirection="row">
        {RenderResImage(countRes)}
        <Text fontSize={16} fontFamily="NunitoBold" color={COLORS.white}>Зарезервировать желание</Text>
      </Box>
    </AuthButton>
  );
}

export default ButtonReserved;
