import React, { useEffect, useState } from 'react';
import { IAdvert } from '../../interfaces/advert/advert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Endpoints from '../../endpoints/endpoints';

const SingleAdvert: React.FC = () => {
  const params = useParams<{ id: string | undefined }>();
  const [advert, setAdvert] = useState<IAdvert>();
  //console.log(params.id);

  useEffect(() => {
    getAdvert();
  }, []);

  const getAdvert = () => {
    axios
      .get(`${Endpoints.defaultEndpoint}/adverts/${params.id}`)
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
          <div>
            {advert.pictures.map((picture, index) => (
              <img key={index} src={`https://localhost:44320/${picture.path}`} alt={`${picture.uniqueName.substring(0, picture.uniqueName.length - 4)}`} style={{ height: '50%', width: '50%' }}/>
            ))}
          </div>
        </>
      )}
      {/* <p>{advert && advert.id}</p>
      <p>{advert && advert.name}</p> */}
    </div>
  );
};

export default SingleAdvert;
