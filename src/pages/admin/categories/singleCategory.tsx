import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getUrl from '../../../endpoints/getUrl';
import { ICategory } from '../../../interfaces/category/category';

const SingleCategory: React.FC = () => {
  const params = useParams<{ id: string | undefined }>();
  const [category, setCategory] = useState<ICategory>();

  const getCategory = () => {
    axios
      .get(`${getUrl()}/api/categories/${params.id}`)
      .then(response => {
        setCategory(response.data);
      })
      .catch(() => {
        toast.error('Error loading advert');
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      {category && (
        <>
          <p>Name: {category.name}</p>
          <p>Description: {category.description}</p>
          <p>Creation date: {category.creationDate}</p>
        </>
      )}
    </div>
  );
};

export default SingleCategory;
