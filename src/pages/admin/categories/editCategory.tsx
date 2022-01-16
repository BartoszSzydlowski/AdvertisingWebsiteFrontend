import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Endpoints from '../../../endpoints/endpoints';
import { IEditCategory } from '../../../interfaces/category/category';

const EditCategoryForm: React.FC = () => {
  const [category, setCategory] = useState<IEditCategory>({
    name: '',
    description: ''
  });
  const [editCategory, setEditCategory] = useState<IEditCategory>({
    name: '',
    description: ''
  });
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [error, setError] = useState<string>('');


  const fetchCategory = () => {
    axios.get(`${Endpoints.defaultEndpoint}/categories/${params.id}`)
    .then(response => {
      setCategory(response.data);
      setEditCategory(response.data);
    })
    .catch(error => {
      setError(error.message);
    })
  }

  const putCategory = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = Cookies.get('Token');
    axios.put(`${Endpoints.defaultEndpoint}/categories`, JSON.stringify(editCategory), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response);
    })
    .then(() => {
      history.push(`/categories/${params.id}`)
    })
    .catch(error => {
      setError(error.message);
    })
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  if(error) {
    return <div>{error}</div>;
  } else {
    return (
      <>
        {category && 
          <form onSubmit={putCategory}>
            <table style={{ margin: '0 auto' }}>
              <tbody>
                <tr>
                  <td>Name: </td>
                  <td><input type="text" value={editCategory.name} onChange={ e => setEditCategory(prev => ({ ...prev, name: e.target.value })) }/></td>
                </tr>
                <tr>
                  <td>Description: </td>
                  <td><input type="text" value={editCategory.description} onChange={ e => setEditCategory(prev => ({ ...prev, description: e.target.value })) }/></td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Edit advert" />
          </form>
        }
      </>
    );
  }
};

export default EditCategoryForm;
