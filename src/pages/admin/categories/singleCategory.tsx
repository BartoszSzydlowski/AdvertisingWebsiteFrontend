import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Endpoints from '../../../endpoints/endpoints';
import { ICategory } from '../../../interfaces/category/category';

const SingleCategory: React.FC = () => {
  const params = useParams<{ id: string | undefined }>();
  const [category, setCategory] = useState<ICategory>();

  const getCategory = () => {
    axios
      .get(`${Endpoints.defaultEndpoint}/categories/${params.id}`)
      .then(response => {
        //console.log(response.data);
        setCategory(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getCategory();
  }, [])

  return(
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
}

export default SingleCategory;
