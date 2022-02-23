const getUrl = (): string => {
  let url = '';
  console.log(process.env);
  if (process.env.REACT_APP_ENV === 'production') {
    url = 'https://advwebsitebszydlowski.gateway.api.zanreal.pl';
  }
  if (process.env.REACT_APP_ENV === 'development') {
    url = 'https://localhost:44320';
  }
  return url;
};

export default getUrl;
