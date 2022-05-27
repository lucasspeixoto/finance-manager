export const TitleCase2 = (string: string) => {
  if (string === null || string === '') return false;
  else string = string.toString();
  return string.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const TitleCase = (string: string) => {
  if (string === null || string === '' || string === undefined) return false;
  else string = string.toString();
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
