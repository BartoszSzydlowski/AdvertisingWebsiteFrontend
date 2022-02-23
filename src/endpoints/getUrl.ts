const getUrl = (): string => {
  let url = '';
  console.log(process.env);
  if (
    !process.env.REACT_APP_ENV ||
    process.env.REACT_APP_ENV === 'development'
  ) {
    url = 'https://localhost:44320';
  } else {
    url = 'XDDDDDDDDDDDDD';
  }
  return url;
};

export default getUrl;
