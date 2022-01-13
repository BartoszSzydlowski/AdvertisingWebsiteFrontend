import React, { useState, useEffect } from 'react';
import Endpoints from '../../endpoints/endpoints';
import { ICategory } from '../../interfaces/category/category';
import axios from 'axios';

// interface ICategoriesProps {
//   onChange: (handler: React.ChangeEvent<HTMLSelectElement>) => void;
// }

const GetCategory: React.FC<{ onChange: React.ChangeEventHandler<HTMLSelectElement> }> = (props) => {
//const GetCategory: React.FC<{ onChange: React.ChangeEventHandler<HTMLSelectElement> }> = (props) => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    axios.get(`${Endpoints.defaultEndpoint}/categories`).then(data => {
      setCategories(data.data);
    });
  }, []);

  return (
    <select style={{ width: '100%' }} onChange={props.onChange}>
      {categories &&
        categories.map(el => (
          <option key={el.id.toString()} id={el.id.toString()} value={el.id}>
            {el.name}
          </option>
        ))}
    </select>
  );
};

export default GetCategory;
