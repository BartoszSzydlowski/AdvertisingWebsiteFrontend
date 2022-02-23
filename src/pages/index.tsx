import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination/pagination';
import getUrl from '../endpoints/getUrl';
import { IAdvert } from '../interfaces/advert/advert';

const Home: React.FC = () => {
  const [adverts, setAdverts] = useState<Array<IAdvert>>([]);
  const [error, setError] = useState<{ message: string }>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAdverts = () => {
    axios
      .get(
        `${getUrl()}/api/Adverts/GetAllPagedByAcceptStatus?PageNumber=${page}&PageSize=10&Ascending=true&isAccepted=true`
      )
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ margin: '5px' }}>
          {adverts.map(advert => (
            <div
              key={advert.id}
              style={{
                margin: '20px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1 0 50%',
                minWidth: '350px',
                minHeight: '190px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                alignContent: 'center'
              }}
            >
              <div
                style={{
                  flexGrow: 1,
                  maxWidth: '280px',
                  minWidth: '280px',
                  padding: '5px'
                }}
              >
                {advert.pictures[0] && (
                  <img
                    style={{ height: '10rem', padding: '20px' }}
                    src={`https://localhost:44320/${advert.pictures[0].path}`}
                  />
                )}
              </div>
              <div style={{ flexGrow: 1, margin: '20px' }}>
                <p>
                  <Link to={`adverts/${advert.id}`}>{advert.name}</Link>
                </p>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          pageNumbers={totalPages}
          onClick={(e: React.FormEvent<HTMLInputElement>) =>
            setPage(parseInt(e.currentTarget.value))
          }
          activePage={page}
          setActivePage={setPage}
        />
      </div>
    );
  }
};

export default Home;
