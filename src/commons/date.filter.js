import dayjs from "dayjs";
import utc  from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export default date => {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};
