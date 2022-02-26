import React from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Platform } from 'react-native'
import useToasts from "../../hooks/useToast";
import {useSelector} from "react-redux";
import {userCRUD} from "../../http/CRUD";
import {changeUserInfo} from "../../redux/actions/authActions";
import moment from "moment";

function CalendarShared({show, setShow, date, setDate}) {

    const {show: showToast} = useToasts()
    const {userInfo} = useSelector((state) => state.user);

    const handleConfirm = async (date) => {
        await setShow(false);
        setDate(date)
        await userCRUD.edit(userInfo.id, {
            ...userInfo,
            birthdate: moment(date).format('YYYY-MM-DD'),
        }).then(async ({data}) => {
            await changeUserInfo('userInfo', data)
            await showToast(1500)
        })
    };

    return (
        <DateTimePickerModal
            isVisible={show}
            date={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onConfirm={handleConfirm}
            cancelTextIOS="Отмена"
            confirmTextIOS="Выбрать"
            onCancel={() => setShow(false)}
        />
    )
}

export default CalendarShared;
