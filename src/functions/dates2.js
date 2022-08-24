import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const convertComment = (date) => {
  moment.locale('ru');
  let diffTime = moment(new  Date()).diff(moment(date)) / (1000 * 60);
  let hours = Math?.floor(diffTime / 60);
  if (hours>48) {
    return moment(date).format("DD MMMM YYYY");
  }
  return moment(date).startOf('minute').fromNow();
};

export const convertComment2 = (date) => {
  moment.locale('ru');
  return moment(date).startOf('minute');
};
