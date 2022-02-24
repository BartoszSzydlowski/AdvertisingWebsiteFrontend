const getUrl = (): string => {
  let url = '';
  if (process.env.REACT_APP_ENV === 'production') {
    url = 'https://gateway.api.zanreal.pl/advwebsitebszydlowski';
  }
  if (process.env.REACT_APP_ENV === 'development') {
    url = 'https://localhost:44320';
  }
  return url;
};

export default getUrl;
