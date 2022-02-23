import React, { useEffect, useState } from 'react';
import { IAdvert } from '../../interfaces/advert/advert';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import styles from './singleAdvert.module.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import getUrl from '../../endpoints/getUrl';

const SingleAdvert: React.FC = () => {
  const params = useParams<{ id: string | undefined }>();
  const [advert, setAdvert] = useState<IAdvert>();
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    phoneNumber: string;
  }>({ username: '', email: '', phoneNumber: '' });

  useEffect(() => {
    getAdvert();
  }, []);

  const getAdvert = () => {
    axios
      .get(`${getUrl()}/api/adverts/${params.id}`)
      .then(response => {
        setAdvert(response.data.data);
        fetchUserData(response.data.data.userId);
      })
      .catch(error => {
        console.log(error);
        toast.error('Error loading advert');
      });
  };

  const fetchUserData = (userId: string) => {
    axios
      .get(`${getUrl()}/api/identity/getuserdata?userId=${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const imagesArray = advert?.pictures.map((picture, index) => (
    <img key={index} src={`${getUrl()}/${picture.path}`} alt={picture.path} />
  ));

  return (
    <div className={styles.Container}>
      {advert && (
        <>
          <h2 className={styles.Advert__Title}>{advert.name}</h2>
          <p className={styles.Advert__Category}>
            Category: {advert.category.name}
          </p>
          <div className={styles.Separator}> </div>
          <div className={styles.Container__Middle}>
            <div className={styles.elo}>
              <AliceCarousel autoHeight autoWidth items={imagesArray} />
            </div>
            <div className={styles.Advert_UserInfo}>
              <p>📋 {userData.username}</p>
              <p>📧 {userData.email}</p>
              <p>📞 {userData.phoneNumber}</p>
              <p className={styles.Advert_UserInfo_Price}>💵 {advert.price}</p>
            </div>
          </div>
          <div className={styles.Separator}> </div>
          <p className={styles.Advert_Description}>{advert.description}</p>
        </>
      )}
    </div>
  );
};

export default SingleAdvert;
