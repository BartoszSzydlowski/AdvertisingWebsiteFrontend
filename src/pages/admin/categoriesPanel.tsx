import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Endpoints from '../../endpoints/endpoints';
import { ICategory } from '../../interfaces/category/category';

const CategoriesPanel: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  // axios.get(`${Endpoints.defaultEndpoint}/categories`)
  //   .then(response => {
  //     setCategories(response.data);
  //   });

  const getCategories = () => {
    axios.get(`${Endpoints.defaultEndpoint}/categories`)
      .then(response => {
        setCategories(response.data);
        setIsLoaded(true);
      })
      .catch(error => {
        setError(error.message);
        setIsLoaded(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, [])

  if (error) {
    return <div>{error}</div>
  } else if (!isLoaded) {
    return <div>Loading categories...</div>;
  } else {
    return (
      <div>
        {categories && categories.map(category => (
          <div key={category.id}>
            {category.name}
          </div>
        ))}
      </div>
    )
  }
}

export default CategoriesPanel;
