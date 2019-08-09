export default utc => {
  const utcObj = new Date(utc);
  utc = utcObj.toString().split(' ');
  return `${utc[1]} ${utc[2]}, ${utc[3]}`;
};