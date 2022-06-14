import moment from 'moment';
import momentDuration from 'moment-duration-format';

momentDuration(moment);

export const convertDuration = (duration) => {
  return moment?.duration(duration, 'seconds')?.format('mm:ss', {
    trim: false
  });
};
