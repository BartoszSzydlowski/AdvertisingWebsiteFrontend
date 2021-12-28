import React from 'react';
import { IAdvert } from '../../interfaces/advert/advert';

const SingleAdvert = (advert: IAdvert) => {
  return (
    <div>
      <p>DZIALA SINGLE ADVERT XD</p>
      <p>{advert.id}</p>
      <p>{advert.name}</p>
    </div>
  );
};

export default SingleAdvert;
