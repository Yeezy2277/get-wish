import React from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Platform } from 'react-native'
import useToasts from "../../hooks/useToast";

function CalendarShared({show, setShow, date, setDate}) {

    const {show: showToast} = useToasts()

    const handleConfirm = (date) => {
        setDate(date)
        setShow(false);
        showToast(1500)
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
