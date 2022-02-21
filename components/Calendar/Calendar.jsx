import {Calendar, LocaleConfig} from 'react-native-calendars';
import React from 'react';
import {ArrowBackIcon, ArrowForwardIcon} from "native-base";

LocaleConfig.locales['ru'] = {
    monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    monthNamesShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    dayNames: [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота',
    ],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
};
LocaleConfig.defaultLocale = 'ru';



function CalendarShared(props) {
    return (
        <Calendar
            current={'2021-01-01'}
            minDate={'1900-05-10'}
            maxDate={'2018-05-30'}
            renderArrow={(direction) => direction === 'left' ? <ArrowBackIcon  size="4" /> : <ArrowForwardIcon size="4" />}
        />
    );
}

export default CalendarShared;
