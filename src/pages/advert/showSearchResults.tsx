import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import getUrl from '../../endpoints/getUrl';
import { IAdvert } from '../../interfaces/advert/advert';

const ShowSearchResult: React.FC = () => {
  const url = window.location.search;
  const query = new URLSearchParams(url);
  const filter = query.get('filter');
  const categoryId = query.get('categoryId');
  const [adverts, setAdverts] = useState<IAdvert[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchAdverts = () => {
    if (categoryId != null && filter != null) {
      axios
        .get(
          `${getUrl()}/api/Adverts/GetAllPagedByCategoryAndAcceptStatus?PageNumber=${page}&PageSize=10&categoryId=${categoryId}&filterBy=${filter}&isAccepted=true`
        )
        .then(response => {
          setAdverts(response.data.data);
          setTotalPages(response.data.totalPages);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (categoryId == null && filter == null) {
      axios
        .get(
          `${getUrl()}/api/Adverts/GetAllPagedByCategoryAndAcceptStatus?PageNumber=${page}&PageSize=10&isAccepted=true`
        )
        .then(response => {
          setAdverts(response.data.data);
          setTotalPages(response.data.totalPages);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      if (categoryId != null) {
        axios
          .get(
            `${getUrl()}/api/Adverts/GetAllPagedByCategoryAndAcceptStatus?PageNumber=${page}&PageSize=10&categoryId=${categoryId}&isAccepted=true`
          )
          .then(response => {
            setAdverts(response.data.data);
            setTotalPages(response.data.totalPages);
          })
          .catch(error => {
            console.log(error);
          });
      } else if (filter != null) {
        axios
          .get(
            `${getUrl()}/api/Adverts/GetAllPagedByCategoryAndAcceptStatus?PageNumber=${page}&PageSize=10&filterBy=${filter}&isAccepted=true`
          )
          .then(response => {
            setAdverts(response.data.data);
            setTotalPages(response.data.totalPages);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    fetchAdverts();
  }, [page, filter, categoryId]);

  return (
    <>
      {adverts && (
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
                key={`${advert.id}`}
                id={`${advert.id}`}
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
                      src={`${getUrl()}/${advert.pictures[0].path}`}
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
      )}
    </>
  );
};

export default ShowSearchResult;
