import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Endpoints from '../../../endpoints/endpoints';
import { ICategory } from '../../../interfaces/category/category';

const Categories: React.FC = () => {
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

  const deleteCategory = (categoryId: number, categoryName: string) => {
    const isConfirmed = confirm(`Are you sure you want to remove ${categoryName}?`);

    if (isConfirmed) {
      axios.delete(`${Endpoints.defaultEndpoint}/categories/${categoryId}`)
      .then(() => {
        console.log("Deleted category");
      })
      .then(() => {
        getCategories();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  if (error) {
    return <div>{error}</div>
  } else if (!isLoaded) {
    return <div>Loading categories...</div>;
  } else {
    return (
      <>
        {categories && categories.map(category => (
          <>
            <div key={category.id}>
              <Link to={`categories/${category.id}`}>{category.name}</Link>
              <Link to='/'><input type="submit" value="Edit" /></Link>
              <input type="submit" value="Delete" onClick={(() => deleteCategory(category.id, category.name))}/>
            </div>
          </>
        ))}
        <Link to="/createCategory"><input type="submit" value="Add new category"/></Link>
      </>
    )
  }
}

export default Categories;
