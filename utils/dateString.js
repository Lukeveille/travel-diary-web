export default utc => {
  const theDate = new Date(utc),
  utcObj = theDate.toString().split(' '),
  offset = theDate.getTimezoneOffset() / 60,
  
  time = utcObj[4]? utcObj[4].split(':') : '',
  month = new Date(utc).getMonth() + 1,
  hour = time[0] >= (24-offset)? parseInt(time[0])-(24-offset) : parseInt(time[0])+offset,
  
  dateString = `${utcObj[1]} ${utcObj[2]}, ${utcObj[3]}`,
  dateInput = `${utcObj[3]}-${month < 10? '0' + month : month}-${utcObj[2]}`,
  timeDisplay = `${hour === 0? 12 : hour > 12? hour - 12 : hour}:${time[1]} ${hour > 12? 'p' : 'a'}m`,
  timeInput = `${hour < 10? '0' + hour : hour}:${time[1]}`;
  
  return [dateString, dateInput, timeDisplay, timeInput];
};