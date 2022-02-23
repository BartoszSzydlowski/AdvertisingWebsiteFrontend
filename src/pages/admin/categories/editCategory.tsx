import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getUrl from '../../../endpoints/getUrl';
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
  const [errors, setErrors] = useState<string[]>([]);

  const fetchCategory = () => {
    axios
      .get(`${getUrl()}/api/categories/${params.id}`)
      .then(response => {
        setCategory(response.data);
        setEditCategory(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const putCategory = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = Cookies.get('Token');
    axios
      .put(`${getUrl()}/api/categories`, JSON.stringify(editCategory), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        history.push(`/categories/${params.id}`);
      })
      .catch(error => {
        setErrors(error.response.data.errors);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

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
      {category && (
        <form onSubmit={putCategory}>
          <table style={{ margin: '0 auto' }}>
            <tbody>
              <tr style={{ borderBottom: '10px solid transparent' }}>
                <td>Name: </td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    value={editCategory.name}
                    onChange={e =>
                      setEditCategory(prev => ({
                        ...prev,
                        name: e.target.value
                      }))
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
                    value={editCategory.description}
                    onChange={e =>
                      setEditCategory(prev => ({
                        ...prev,
                        description: e.target.value
                      }))
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input className="btn btn-dark" type="submit" value="Edit advert" />
        </form>
      )}
      {errors && errors.map((error, index) => <p key={index}>{error}</p>)}
    </div>
  );
};

export default EditCategoryForm;
