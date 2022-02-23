import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import getUrl from '../../endpoints/getUrl';
import { ICategory } from '../../interfaces/category/category';

const CategoriesNavbar: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  const fetchCategories = () => {
    axios.get(`${getUrl()}/api/categories`).then(response => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {categories &&
        categories.map(category => (
          <NavDropdown.Item
            key={category.id}
            as={Link}
            to={`/showByCategory/${category.id}`}
          >
            {category.name}
          </NavDropdown.Item>
        ))}
    </>
  );
};

export default CategoriesNavbar;
