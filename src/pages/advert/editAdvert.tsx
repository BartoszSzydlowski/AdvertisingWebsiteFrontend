import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserDataContext } from '../../App';
import GetCategory from '../../components/category/categorySelect';
import getUrl from '../../endpoints/getUrl';
import { IEditAdvert } from '../../interfaces/advert/advert';

const EditAdvert: React.FC = () => {
  const [advert, setAdvert] = useState<IEditAdvert>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    categoryId: 1,
    isPromoted: false,
    isAccepted: false,
    isExpired: true
  });
  const [editAdvert, setEditAdvert] = useState<IEditAdvert>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    categoryId: 1,
    isPromoted: false,
    isAccepted: false,
    isExpired: true
  });
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);
  const userContext = useContext(UserDataContext);

  const fetchAdvert = () => {
    axios
      .get(`${getUrl()}/api/adverts/${params.id}`)
      .then(response => {
        setEditAdvert(response.data.data);
        setAdvert(response.data.data);
      })
      .catch(() => {
        toast.error('Error loading advert');
      });
  };

  const putAdvert = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = Cookies.get('Token');
    axios
      .put(`${getUrl()}/api/adverts`, JSON.stringify(editAdvert), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        history.push(`/adverts/${editAdvert.id}`);
      })
      .catch(error => {
        //console.log(error.response.data.message);
        toast.error(error.response.data.message);
        setErrors(error.response.data.errors);
      });
  };

  useEffect(() => {
    fetchAdvert();
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
      {advert && (
        <form
          onSubmit={putAdvert}
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
                    type="number"
                    value={editAdvert.price}
                    onChange={e =>
                      setEditAdvert(prev => ({
                        ...prev,
                        name: e.target.value
                      }))
                    }
                  />
                </td>
              </tr>
              <tr style={{ borderBottom: '10px solid transparent' }}>
                <td>Price: </td>
                <td>
                  <input
                    className="form-control"
                    type="number"
                    value={editAdvert.price}
                    onChange={e =>
                      setEditAdvert(prev => ({
                        ...prev,
                        price: parseInt(e.target.value)
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
                    value={editAdvert.description}
                    onChange={e =>
                      setEditAdvert(prev => ({
                        ...prev,
                        description: e.target.value
                      }))
                    }
                  />
                </td>
              </tr>
              <tr style={{ borderBottom: '10px solid transparent' }}>
                <td>Category: </td>
                <td>
                  <GetCategory
                    onChange={e => {
                      setEditAdvert(prev => ({
                        ...prev,
                        categoryId: parseInt(e.target.value)
                      }));
                    }}
                    categoryId={editAdvert.categoryId}
                  />
                </td>
              </tr>
              {(userContext.userRole == 'Admin' ||
                userContext.userRole == 'Moderator') && (
                <tr style={{ borderBottom: '10px solid transparent' }}>
                  <td>Accept status</td>
                  <td>
                    <div className="btn-group btn-group-toggle">
                      <input
                        className="btn-check"
                        id="isAcceptedYesOption"
                        type="radio"
                        checked={editAdvert.isAccepted}
                        onChange={e =>
                          setEditAdvert(prev => ({
                            ...prev,
                            isAccepted: e.target.checked
                          }))
                        }
                      />
                      <label
                        className="btn btn-secondary"
                        htmlFor="isAcceptedYesOption"
                      >
                        Yes
                      </label>
                      <input
                        className="btn-check"
                        id="isAcceptedNoOption"
                        type="radio"
                        checked={!editAdvert.isAccepted}
                        onChange={e =>
                          setEditAdvert(prev => ({
                            ...prev,
                            isAccepted: !e.target.checked
                          }))
                        }
                      />
                      <label
                        id="isAcceptedYesOption"
                        className="btn btn-secondary"
                        htmlFor="isAcceptedNoOption"
                      >
                        No
                      </label>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={2}>
                  {errors &&
                    errors.map((error, index) => <p key={index}>{error}</p>)}
                </td>
              </tr>
            </tbody>
          </table>
          <input className="btn btn-dark" type="submit" value="Edit advert" />
        </form>
      )}
    </div>
  );
};

export default EditAdvert;
