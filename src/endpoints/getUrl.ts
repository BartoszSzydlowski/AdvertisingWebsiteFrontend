const getUrl = (): string => {
  let url = '';
  if (process.env.REACT_APP_ENV === 'production') {
    //url = 'https://advwebsitebszydlowski.zanreal.pl';
    url = 'https://advertisingwebsitebszydlowski.com.pl';
  }
  if (process.env.REACT_APP_ENV === 'development') {
    url = 'https://localhost:44320';
  }
  return url;
};

export default getUrl;
