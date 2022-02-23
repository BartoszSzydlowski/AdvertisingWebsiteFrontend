const getUrl = (): string => {
  let url = '';
  if (!process.env.REACT_APP_ENV) {
    url = 'https://localhost:44320';
  } else {
    url = 'XDDDDDDDDDDDDD';
  }
  return url;
};

export default getUrl;
