import React, { useState, useEffect } from 'react';
import Endpoints from '../../endpoints/endpoints';
import { ICategory } from '../../interfaces/category/category';
import axios from 'axios';

const GetCategory: React.FC<{ 
  onChange: React.ChangeEventHandler<HTMLSelectElement>,
  categoryId?: number
}> = (props) => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    axios.get(`${Endpoints.defaultEndpoint}/categories`).then(data => {
      setCategories(data.data);
    });
  }, []);

  return (
    <select style={{ width: '100%' }} onChange={props.onChange} value={props.categoryId}>
      {categories &&
        categories.map(category => (
          <option key={category.id.toString()} id={category.id.toString()} value={category.id}>
            {category.name}
          </option>
        ))}
    </select>
  );
};

export default GetCategory;
