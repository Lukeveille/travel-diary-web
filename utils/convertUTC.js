export default (date, time) => {
  let utc = 0;
  date = date.split('-');
  if (time) {
    time = time.split(':');
    utc = Date.UTC(date[0], date[1]-1, parseInt(date[2]), time[0], time[1]);
  } else {
    utc = Date.UTC(date[0], date[1]-1, parseInt(date[2])+1);
  };
  return utc;
};