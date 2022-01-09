import React, { useEffect, useState } from 'react';
import { IAdvert } from '../../interfaces/advert/advert';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import Endpoints from '../../endpoints/endpoints';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserAdverts = () => {
  const [adverts, setAdverts] = useState<Array<IAdvert>>([]);
  const [error, setError] = useState<any>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAdverts = () => {
    const token = Cookies.get('Token');
    axios
      .get(`${Endpoints.defaultEndpoint}/api/Adverts/GetAllPagedByUserId?PageNumber=${page}&PageSize=10&Ascending=true`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setTotalPages(response.data.totalPages);
        setAdverts(response.data.data);
        setIsLoaded(true);
        // console.log(response.data.totalPages);
        // console.log(response.data.data);
        console.log(response);
      })
      .catch(error => {
        setIsLoaded(false);
        setError(error);
      });
  };

  useEffect(() => {
    getAdverts();
  }, [page]);

  if (error) {
    return <div>{error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading adverts...</div>;
  } else {
    return (
      <div>
        <div style={{ margin: '5px' }}>
          {adverts.map((advert: any) => {
            return (
              <div key={`${advert.id}`} id={`${advert.id}`}>
                <Link to={`adverts/${advert.id}`}>{advert.name}</Link>
                <input type="submit" value="Edit" />
                <input type="submit" value="Delete" />
              </div>
            );
          })}
        </div>
        <Pagination pageNumbers={totalPages} onClick={(e: any) => setPage(parseInt(e.currentTarget.value))} activePage={page} setActivePage={setPage} />
      </div>
    );
  }
};

export default UserAdverts;