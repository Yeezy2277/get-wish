import React from 'react';
import {
  Actionsheet, Box, Image, Pressable, ScrollView, Text
} from 'native-base';
import { COLORS } from '../../functions/constants';
import { goToAddWishList } from '../../functions/helpers';
import { setWishId } from '../../redux/actions/wishActions';

function ChoseWishActionsheet({
  open, handleClose, active, setActive, data
}) {

  const handleChangeActive = (id) => {
    if (active !== id) {
      setActive(id);
    }
  };

  const handleAddWish = async () => {
    handleClose();
    await setWishId(active);
    goToAddWishList();
  };

  return (
    <Actionsheet
      padding={0}
      isOpen={open}
      position="relative"
      onClose={handleClose}
    >
      <Actionsheet.Content style={{ elevation: 0 }} padding={0} backgroundColor="#fff">
        <Box alignItems="center" flexDirection="row" justifyContent="space-between" width="100%" pl="20px" pr="20px">
          <Text fontFamily="NunitoBold" color={COLORS.black} fontSize="18px">Выбери вишлист</Text>
          <Pressable
            onPress={handleAddWish}
            width="129px"
            alignItems="center"
            flexDirection="row"
          >
            <Image size="12px" source={require('../../assets/images/icons/wishlist/wish_add.png')} />
            <Text marginLeft="10px" fontFamily="NunitoBold" color={COLORS.purple} fontSize="15px">Создать новый</Text>
          </Pressable>
        </Box>
        <ScrollView maxHeight="250px" marginTop="22px" pl="16.5px" pr="22px" width="100%">
          {data?.length ? data?.map((el) => {
            return (
              <Pressable onPress={() => handleChangeActive(el.id)} key={el.id} flexDirection="row" alignItems="center" width="100%" height="50px" justifyContent="space-between">
                <Text>
                  <Text>
                    {el?.symbol}
                    {'   '}
                  </Text>
                  <Text fontSize="18px">
                    {el?.name}
                  </Text>
                </Text>
                {el?.id === active ? <Image size="14px" source={require('../../assets/images/icons/wishlist/check.png')} /> : null}
              </Pressable>
            );
          }) : null}
        </ScrollView>
      </Actionsheet.Content>

    </Actionsheet>
  );
}

export default ChoseWishActionsheet;
