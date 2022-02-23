import React, { useEffect, useState } from 'react';
import { IAdvert } from '../../interfaces/advert/advert';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import getUrl from '../../endpoints/getUrl';

const UserAdverts: React.FC = () => {
  const [adverts, setAdverts] = useState<Array<IAdvert>>([]);
  const [error, setError] = useState<{ message: string }>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAdverts = () => {
    const token = Cookies.get('Token');
    axios
      .get(
        `${getUrl()}/api/Adverts/GetAllPagedByUserId?PageNumber=${page}&PageSize=10&Ascending=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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

  const deleteAdvert = (advertId: number, advertName: string) => {
    const isConfirmed = confirm(
      `Are you sure you want to remove ${advertName}?`
    );
    const token = Cookies.get('Token');

    if (isConfirmed) {
      axios
        .delete(`${getUrl()}/api/adverts/${advertId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          toast(`Successfully removed ${advertName}`);
        })
        .then(() => {
          getAdverts();
        })
        .catch(error => {
          console.log(error);
          toast.error(`Error removing ${advertName}`);
        });
    }
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
        <div>
          {adverts.map((advert: IAdvert) => (
            <div
              style={{ margin: '5px' }}
              key={`${advert.id}`}
              id={`${advert.id}`}
            >
              <Link to={`adverts/${advert.id}`}>{advert.name}</Link>
              <div>
                <Link to={`editAdvert/${advert.id}`}>
                  <input
                    style={{ margin: '5px' }}
                    className="btn btn-dark"
                    type="submit"
                    value="Edit"
                  />
                </Link>
                <input
                  type="submit"
                  className="btn btn-dark"
                  value="Delete"
                  onClick={() => deleteAdvert(advert.id, advert.name)}
                />
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

export default UserAdverts;
