export default utc => {
  let utcObj = new Date(utc).toString().split(' ');
  const dateString = `${utcObj[1]} ${utcObj[2]}, ${utcObj[3]}`,
  
  year = new Date(utc).getFullYear(),
  month = new Date(utc).getMonth() + 1,
  day = new Date(utc).getDate(),
  dateInput = `${year}-${month < 10? '0' + month : month}-${day < 10? '0' + day : day}`,
  
  hour = new Date(utc).getHours(),
  min = new Date(utc).getMinutes(),
  timeDisplay = `${hour > 12? hour - 12 : hour}:${min < 10? '0' + min : min} ${hour > 12? 'p' : 'a'}m`;
  return [dateString, dateInput, timeDisplay, `${hour < 10? '0' + hour : hour}:${min < 10? '0' + min : min}`];
};