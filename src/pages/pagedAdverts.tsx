import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/pagination/pagination';
import Endpoints from '../endpoints/endpoints';
import { Advert } from '../interfaces/advert/advert';

const PagedAdverts = () => {
  const [adverts, setAdverts] = useState<Array<Advert>>([]);
  const [error, setError] = useState<any>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  //const [pagedResponse, setPagedResponse] = useState<any>();
  //const pageNumbers: any[] = [];
  //const [pageNumbers, setPageNumbers] = useState<number[]>([]);


  const getAdverts = () => {
    axios
      .get(`${Endpoints.defaultEndpoint}/api/Adverts/GetAllPaged?PageNumber=${page}&PageSize=10&Ascending=true`)
      .then(response => {
        setTotalPages(response.data.totalPages);
        //setPagedResponse(response.data);
        setAdverts(response.data.data);
        setIsLoaded(true);
        //console.log(response.data.totalPages);
        //console.log(response.data.data);
      })
      .catch(error => {
        setIsLoaded(false);
        setError(error);
      });
  };

  useEffect(() => {
    getAdverts();
  }, [page]);

  // const setPagination = () => {
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  //   }
  //   return (
  //     <nav>
  //       <div>
  //         {pageNumbers.map(number => (
  //           <input key={number} type="submit" value={number} onClick={e => setPage(parseInt(e.currentTarget.value))} />
  //         ))}
  //       </div>
  //     </nav>
  //   );
  // };

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
                {advert.name}
              </div>
            );
          })}
        </div>
        <Pagination pageNumbers={totalPages} onClick={(e: any) => setPage(parseInt(e.currentTarget.value))} activePage={page} setActivePage={setPage} />
      </div>
    );
  }
};

export default PagedAdverts;
