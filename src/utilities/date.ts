import moment from 'moment';

export const convertDateTime = (datetime: Date | string) => {
  if (!datetime) return "-";

  const date = moment(new Date(datetime));
  return date.format("hh:mm - ddd, MMM DD");
};
