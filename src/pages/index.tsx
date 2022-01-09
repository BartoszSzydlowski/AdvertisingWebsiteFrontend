//import axios from 'axios';
//import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import Endpoints from '../endpoints/endpoints';
//import { IAdvert } from '../interfaces/advert/advert';

const Home = () => {
  //const userRole = useContext(RoleContext);
  const [username, setUsername] = useState<string>('');
  // const [adverts, setAdverts] = useState<Array<IAdvert>>([]);
  // const [error, setError] = useState<any>('');
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // const getAdverts = () => {
  //   axios
  //     .get(`${Endpoints.defaultEndpoint}/api/Adverts`)
  //     .then(response => {
  //       setAdverts(response.data);
  //       setIsLoaded(true);
  //     })
  //     .catch(error => {
  //       setIsLoaded(false);
  //       setError(error);
  //     });
  // };

  useEffect(() => {
    const token = Cookies.get('Token');
    axios
      .get(`https://localhost:44320/api/Identity/GetUserName`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(() => {
        setUsername('');
      });
  }, [username]);

  // useEffect(() => {
  //   getAdverts();
  // }, []);

  // if (error) {
  //   return <div>{error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading adverts...</div>;
  // } else {
  //   return (
  //     <div
  //       // style={{
  //       //     display: 'block',
  //       //     justifyContent: 'center',
  //       //     alignItems: 'center',
  //       //     height: '100vh'}}
  //       style={{ margin: '5px' }}
  //     >
  //       {adverts.map(advert => {
  //         return (
  //           <div key={`${advert.id}`} id={`${advert.id}`}>
  //             {advert.name}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }
  return (
    <div>
      Welcome to advertising website, please <Link to="/login">log in</Link> or <Link to="/register">create account</Link>
      {username !== null && username !== '' && <div>Siema {username}</div>}
    </div>
  );
};

export default Home;
