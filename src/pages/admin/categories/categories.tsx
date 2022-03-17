import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import getUrl from '../../../endpoints/getUrl';
import { ICategory } from '../../../interfaces/category/category';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getCategories = () => {
    axios
      .get(`${getUrl()}/api/categories`)
      .then(response => {
        setCategories(response.data);
        setIsLoaded(true);
      })
      .catch(error => {
        setError(error.message);
        setIsLoaded(false);
      });
  };

  const deleteCategory = (categoryId: number, categoryName: string) => {
    const isConfirmed = confirm(
      `Are you sure you want to remove ${categoryName}?`
    );

    const token = Cookies.get('Token');
    if (isConfirmed) {
      axios
        .delete(`${getUrl()}/api/categories/${categoryId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          toast(`Deleted category ${categoryName}`);
        })
        .then(() => {
          getCategories();
        })
        .catch(() => {
          toast.error(`Error removing ${categoryName}`);
        });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (error) {
    return <div>{error}</div>;
  } else if (!isLoaded) {
    return <div>Loading categories...</div>;
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {categories &&
          categories.map(category => (
            <div
              key={category.id}
              id={category.id.toString()}
              style={{ margin: '5px' }}
            >
              <Link to={`categories/${category.id}`}>{category.name}</Link>
              <div>
                <Link to={`editCategory/${category.id}`}>
                  <input className="btn btn-dark" type="submit" value="Edit" />
                </Link>
                <input
                  className="btn btn-dark"
                  type="submit"
                  value="Delete"
                  onClick={() => deleteCategory(category.id, category.name)}
                />
              </div>
            </div>
          ))}
        <div>
          <Link to="/createCategory">
            <input
              className="btn btn-dark"
              type="submit"
              value="Add new category"
            />
          </Link>
        </div>
      </div>
    );
  }
};

export default Categories;
