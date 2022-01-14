import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import Endpoints from '../../endpoints/endpoints';
import { IAdvert } from '../../interfaces/advert/advert';

const ShowByAdvertsCategory: React.FC = () => {
  const [adverts, setAdverts] = useState<IAdvert[]>([]);
  const params = useParams<{ id: string | undefined}>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string }>();

  const fetchAdvertsByCategory = () => {
    axios.get(`${Endpoints.defaultEndpoint}/adverts/GetAllPagedByCategory?PageNumber=${page}&categoryId=${params.id}`)
    .then(response => {
      setTotalPages(response.data.totalPages);
      setAdverts(response.data.data);
      setIsLoaded(true);
    })
    .catch(error => {
      setIsLoaded(false);
      setError(error.message);
    });
  };

  useEffect(() => {
    fetchAdvertsByCategory();
  }, [page, params.id]);

  if(error) {
    return <div>{error.message}</div>
  }

  if(!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <>
      {adverts.map(advert => (
        <div key={advert.id}>
          <Link to={`/adverts/${advert.id}`}>{advert.name}</Link>
        </div>
      ))}
      <Pagination 
        pageNumbers={totalPages}
        onClick={(e: React.FormEvent<HTMLInputElement>) => setPage(parseInt(e.currentTarget.value))}
        activePage={page}
        setActivePage={setPage}
      />
    </>
  );
}

export default ShowByAdvertsCategory;
