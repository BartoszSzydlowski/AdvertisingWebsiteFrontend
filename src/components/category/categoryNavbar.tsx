import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Endpoints from '../../endpoints/endpoints';
import { ICategory } from '../../interfaces/category/category';

const CategoriesNavbar: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  
  const fetchCategories = () => {
    axios.get(`${Endpoints.defaultEndpoint}/categories`)
    .then(response => {
      setCategories(response.data);
    })
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {categories && categories.map(category => (
        <NavDropdown.Item key={category.id} as={Link} to={`/showByCategory/${category.id}`}>
          {category.name}
        </NavDropdown.Item>
      ))}
    </>
  );
}

export default CategoriesNavbar;
