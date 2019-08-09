export default string => {
  if (string) {
    string = string.split('-');
    return Date.UTC(string[0], string[1]-1, parseInt(string[2])+1);
  };
};