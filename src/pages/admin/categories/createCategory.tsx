import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import getUrl from '../../../endpoints/getUrl';
import { ICreateCategory } from '../../../interfaces/category/category';

const CreateCategory: React.FC = () => {
  const [category, setCategory] = useState<ICreateCategory>({
    name: '',
    description: ''
  });
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);

  const create = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const token = Cookies.get('Token');

    axios
      .post(`${getUrl()}/api/categories`, JSON.stringify(category), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        toast('Successfully created category.');
        history.push('/categories');
      })
      .catch(error => {
        toast.error(error.response.data.message);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div
      style={{
        height: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form
        onSubmit={create}
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          padding: '20px'
        }}
      >
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td>Name: </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={category.name}
                  onChange={e =>
                    setCategory(prev => ({ ...prev, name: e.target.value }))
                  }
                />
              </td>
            </tr>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td>Description: </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={category.description}
                  onChange={e =>
                    setCategory(prev => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <input
                  className="btn btn-dark"
                  type="submit"
                  value="Add new category"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {errors &&
                  errors.map((error, index) => <p key={index}>{error}</p>)}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateCategory;
