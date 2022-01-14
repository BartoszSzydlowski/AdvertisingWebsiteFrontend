import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../../../components/pagination/pagination';
import Endpoints from '../../../endpoints/endpoints';
import { IAdvert } from '../../../interfaces/advert/advert';

const ManageAdverts: React.FC = () => {
  const [adverts, setAdverts] = useState<Array<IAdvert>>([]);
  const [error, setError] = useState<{ message: string }>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const deleteAdvert = (advertId: number, advertName: string) => {
    const isConfirmed = confirm(`Are you sure you want to remove ${advertName}?`);
    const token = Cookies.get('Token');

    if (isConfirmed) {
      axios.delete(`${Endpoints.defaultEndpoint}/adverts/${advertId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        toast(`Successfully removed ${advertName}`)
      })
      .then(() => {
        getAdverts();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  
  const getAdverts = () => {
    axios.get(`${Endpoints.defaultEndpoint}/Adverts/GetAllPaged?PageNumber=${page}&PageSize=10&Ascending=true`)
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
              <Link to={`adverts/${advert.id}`}>Id: {advert.id} Name: {advert.name}</Link>
              <input type="submit" value="Edit" />
              <input type="submit" value="Delete" onClick={() => deleteAdvert(advert.id, advert.name)}/>
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

export default ManageAdverts;
