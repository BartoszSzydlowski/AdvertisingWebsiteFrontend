import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Endpoints from '../../../endpoints/endpoints';
import { ICreateCategory } from '../../../interfaces/category/category';

const CreateCategory: React.FC = () => {
  const [category, setCategory] = useState<ICreateCategory>({ name: '', description: ''})
  const history = useHistory();

  const create = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const token = Cookies.get('Token');

    axios.post(`${Endpoints.defaultEndpoint}/categories`, JSON.stringify(category), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log(response);
      history.push('/categories');
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div>
      <form onSubmit={create}>
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <td>Name: </td>
              <td><input type="text" value={category.name} onChange={e => setCategory(prev => ({ ...prev, name: e.target.value }))}/></td>
            </tr>
            <tr>
              <td>Description: </td>
              <td><input type="text" value={category.description} onChange={e => setCategory(prev => ({ ...prev, description: e.target.value }))}/></td>
            </tr>
            <tr>
              <td colSpan={2}><input type="submit" value="Add new category" /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default CreateCategory;
