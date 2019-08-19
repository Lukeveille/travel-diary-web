export default (date, time) => {
  if (date) {
    date = date.split('-');
    time = time.split(':')
    return Date.UTC(date[0], date[1]-1, parseInt(date[2]), time[0], time[1]);
  };
};