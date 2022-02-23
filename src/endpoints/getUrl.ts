import process from 'process';

const getUrl = (): string => {
  let url = '';
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'https://localhost:44320';
    console.log('DEV MODE');
  } else {
    console.log('PROD MODE');
    url = 'XDDDDDDDDDDDDD';
  }
  return url;
};

export default getUrl;
