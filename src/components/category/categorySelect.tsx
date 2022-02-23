import React, { useState, useEffect } from 'react';
import { ICategory } from '../../interfaces/category/category';
import axios from 'axios';
import getUrl from '../../endpoints/getUrl';

const GetCategory: React.FC<{
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  categoryId?: number;
  style?: React.CSSProperties;
}> = props => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    axios.get(`${getUrl()}/api/categories`).then(data => {
      setCategories(data.data);
    });
  }, []);

  return (
    <select
      className="form-select form-select-sm"
      style={props.style}
      onChange={props.onChange}
      value={props.categoryId}
    >
      {categories &&
        categories.map(category => (
          <option
            key={category.id.toString()}
            id={category.id.toString()}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
    </select>
  );
};

export default GetCategory;
