import dayjs from "dayjs";

export default date => {

  return dayjs(date).format('DD/MM/YYYY HH:mm:ss ');
};
