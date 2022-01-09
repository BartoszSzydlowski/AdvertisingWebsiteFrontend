import React, { useEffect, useState } from 'react';
import { IAdvert } from '../../interfaces/advert/advert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Endpoints from '../../endpoints/endpoints';

const SingleAdvert = () => {
  const params = useParams<{ id: string | undefined }>();
  const [advert, setAdvert] = useState<IAdvert>();
  //console.log(params.id);

  useEffect(() => {
    getAdvert();
  }, []);

  const getAdvert = () => {
    axios
      .get(`${Endpoints.defaultEndpoint}/api/adverts/${params.id}`)
      .then(response => {
        //console.log(response.data.data);
        setAdvert(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      {advert && (
        <>
          <p>Id: {advert.id}</p>
          <p>Name: {advert.name}</p>
          <p>Description: {advert.description}</p>
          <p>Price: {advert.price}</p>
          <p id={advert.category.id.toString()}>
            Category: {advert.category.name}
          </p>
        </>
      )}
      {/* <p>{advert && advert.id}</p>
      <p>{advert && advert.name}</p> */}
    </div>
  );
};

export default SingleAdvert;
