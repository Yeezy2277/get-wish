import React from 'react';
import PropTypes from 'prop-types';
import {
  Actionsheet, Box, Radio, Text
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  ActionDesires,
} from '../../styles/profile';
import { COLORS } from '../../functions/constants';
import AuthButton from '../Shared/AuthButton';
import { reserveWish } from '../../redux/actions/wishListActions';

function DesiresScreenElementActionsheetReserv({
  open, setOpen
}) {
  const { oneWish } = useSelector((state) => state.wish);
  const { userInfo } = useSelector((state) => state.user);
  const [value, setValue] = React.useState('public');

  const handleClose = () => {
    setOpen(false);
  };

  async function handleReserve() {
    await reserveWish(oneWish?.id, value !== 'public', userInfo.id);
    handleClose();
    Toast.show({
      type: 'search',
      text1: 'Желание зарезервировано за тобой',
      position: 'bottom',
      bottomOffset: 95
    });

  }

  return (
    <Actionsheet
      zIndex={998}
      padding={0}
      isOpen={open}
      position="relative"
      onClose={handleClose}
    >
      <Actionsheet.Content zIndex={998} style={{ elevation: 0 }} padding={0} backgroundColor="#fff">
        <ActionDesires style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 30 }}>
          <Text fontFamily="NunitoBold" fontSize={18} color={COLORS.black}>Способ резервирования:</Text>
          <Radio.Group
            name="myRadioGroup"
            paddingTop="20px"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            <Radio colorScheme="purple" value="public" my={3}>
              <Box marginLeft="10px">
                <Text fontSize={14} fontFamily="NunitoBold">Публично</Text>
                <Text marginTop="4px" maxWidth="301px" fontSize={13}>
                  Владелец желания и другие пользователи будут
                  знать, что желание зарезервировал именно ты
                </Text>
              </Box>
            </Radio>
            <Radio colorScheme="purple" value="anon" my={3}>
              <Box marginLeft="10px" marginTop="10px">
                <Text fontSize={14} fontFamily="NunitoBold">Анонимно</Text>
                <Text marginTop="4px" maxWidth="301px" fontSize={13}>Об этом никто не узнает</Text>
              </Box>
            </Radio>
          </Radio.Group>
          <AuthButton
            style={{ marginTop: 30, alignSelf: 'center' }}
            onPress={handleReserve}
            active
          >
            Зарезервировать
          </AuthButton>
        </ActionDesires>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

DesiresScreenElementActionsheetReserv.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DesiresScreenElementActionsheetReserv;
