import React from 'react';
import PropTypes from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import useToasts from '../../hooks/useToast';
import { userCRUD } from '../../http/CRUD';
import { changeUserInfo } from '../../redux/actions/authActions';
import {useI18n} from "../../i18n/i18n";

function CalendarShared({
  show, setShow, date, setDate
}) {

  const t = useI18n()
  const { show: showToast } = useToasts();
  const { userInfo } = useSelector((state) => state.user);

  const showOff = () => {
    setShow(false);
  };

  const handleConfirm = async (dateFromPicker) => {
    showOff();
    setDate(dateFromPicker);
    await userCRUD.edit(userInfo.id, {
      ...userInfo,
      birthdate: moment(dateFromPicker).format('YYYY-MM-DD'),
    }).then(async ({ data }) => {
      await changeUserInfo('userInfo', data);
      await showToast(1500);
    });
  };

  return (
    <DateTimePickerModal
      isVisible={show}
      date={date}
      mode="date"
      display={Platform.OS === 'ios' ? 'inline' : 'default'}
      onConfirm={handleConfirm}
      cancelTextIOS={t('cancel')}
      confirmTextIOS={t('select')}
      onCancel={showOff}
    />
  );
}

CalendarShared.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default CalendarShared;
