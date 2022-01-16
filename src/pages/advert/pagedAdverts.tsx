import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import Endpoints from '../../endpoints/endpoints';
import { IAdvert } from '../../interfaces/advert/advert';

const PagedAdverts: React.FC = () => {
  const [adverts, setAdverts] = useState<Array<IAdvert>>([]);
  const [error, setError] = useState<{ message: string }>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAdverts = () => {
    //axios.get(`${Endpoints.defaultEndpoint}/Adverts/GetAllPaged?PageNumber=${page}&PageSize=10&Ascending=true`)
    axios.get(`${Endpoints.defaultEndpoint}/Adverts/GetAllPagedByAcceptStatus?PageNumber=${page}&PageSize=10&Ascending=true&isAccepted=true`)
      .then(response => {
        setTotalPages(response.data.totalPages);
        setAdverts(response.data.data);
        setIsLoaded(true);
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
          {adverts.map(advert => (
            <div key={`${advert.id}`} id={`${advert.id}`}>
              <Link to={`adverts/${advert.id}`}>{advert.name}</Link>
            </div>
          ))}
        </div>
        <Pagination
          pageNumbers={totalPages}
          onClick={(e: React.FormEvent<HTMLInputElement>) => setPage(parseInt(e.currentTarget.value))}
          activePage={page}
          setActivePage={setPage}
        />
      </div>
    );
  }
};

export default PagedAdverts;
