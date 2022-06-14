import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const convertComment = (date) => {
  moment.locale('ru');
  return moment(date).startOf('minute').fromNow();
};
