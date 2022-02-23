import isDev from './developmentCheck';

const getUrl = () => {
  let url = '';
  if (isDev()) {
    url = 'https://localhost:44320';
  } else {
    url = '';
  }
  return url;
};

export default getUrl;
