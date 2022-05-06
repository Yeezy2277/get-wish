import React from 'react';
import PropTypes from 'prop-types';
import {
  Actionsheet, Box, Radio, Text
} from 'native-base';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  ActionDesires,
} from '../../styles/profile';
import { COLORS } from '../../functions/constants';
import AuthButton from '../Shared/AuthButton';
import { reserveWish } from '../../redux/actions/wishListActions';
import {useI18n} from "../../i18n/i18n";

function DesiresScreenElementActionsheetWhy({
  open, setOpen
}) {

  const t = useI18n()
  const handleClose = () => {
    setOpen(false);
  };

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
          <Text textAlign="center" fontFamily="NunitoBold" fontSize={18} color={COLORS.black}>А вот почему!</Text>
          <Text fontSize={14} color={COLORS.gray} marginTop="10px" textAlign="center">Ты зарезервировал уже 3 желания этого друга.</Text>
          <Text alignSelf="center" maxWidth="335px" fontSize={14} color={COLORS.gray} marginTop="10px" textAlign="center">
            {t('desires_youHaveReserve')}
          </Text>
          <AuthButton
            style={{ marginTop: 25, alignSelf: 'center' }}
            active
            onPress={() => setOpen(false)}
          >
            {t('okay')}
          </AuthButton>
        </ActionDesires>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

DesiresScreenElementActionsheetWhy.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DesiresScreenElementActionsheetWhy;
