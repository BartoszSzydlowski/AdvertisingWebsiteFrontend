import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import GetCategory from '../../components/category/categorySelect';
import Endpoints from '../../endpoints/endpoints';
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

  const fetchAdvert = () => {
    axios.get(`${Endpoints.defaultEndpoint}/adverts/${params.id}`)
    .then(response => {
      //console.log(response.data.data);
      setEditAdvert(response.data.data);
      setAdvert(response.data.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const putAdvert = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = Cookies.get('Token');
    axios.put(`${Endpoints.defaultEndpoint}/adverts`, JSON.stringify(editAdvert), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response);
    })
    .then(() => {
      history.push(`/adverts/${editAdvert.id}`);
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    fetchAdvert();
  }, [])

  console.log(editAdvert.categoryId);

  return (
    <>
      {advert && 
        <form onSubmit={putAdvert}>
          <table style={{ margin: '0 auto' }}>
            <tbody>
              <tr>
                <td>Name: </td>
                <td>{advert.name}</td>
              </tr>
              <tr>
                <td>Price: </td>
                <td><input type="number" value={editAdvert.price} onChange={ e => setEditAdvert(prev => ({ ...prev, price: parseInt(e.target.value) })) }/></td>
              </tr>
              <tr>
                <td>Description: </td>
                <td><input type="text" value={editAdvert.description} onChange={ e => setEditAdvert(prev => ({ ...prev, description: e.target.value })) }/></td>
              </tr>
              <tr>
                <td>Category: </td>
                <td>
                  <GetCategory onChange={e => { setEditAdvert(prev => ({ ...prev, categoryId: parseInt(e.target.value) })) }}
                    categoryId={editAdvert.categoryId}
                  />
                </td>
              </tr>
              <tr>
                <td>Accept status</td>
                <td>
                  <input type="radio" checked={editAdvert.isAccepted} 
                    onChange={ e => setEditAdvert(prev => ({ ...prev, isAccepted: e.target.checked })) }
                  /> Yes
                  <input type="radio" checked={!(editAdvert.isAccepted)}
                    onChange={ e => setEditAdvert(prev => ({ ...prev, isAccepted: !e.target.checked })) }
                  /> No
                </td>
              </tr>
              <tr>
                <td>Is promoted</td>
                <td>
                  <input type="radio" checked={editAdvert.isPromoted} 
                    onChange={ e => setEditAdvert(prev => ({ ...prev, isPromoted: e.target.checked })) }
                  /> Yes
                  <input type="radio" checked={!(editAdvert.isPromoted)}
                    onChange={ e => setEditAdvert(prev => ({ ...prev, isPromoted: !e.target.checked })) }
                  /> No
                </td>
              </tr>
              <tr>
                <td>Is expired</td>
                <td>
                  <input type="radio" checked={editAdvert.isExpired} 
                    onChange={ e => setEditAdvert(prev => ({ ...prev, isExpired: e.target.checked })) }
                  /> Yes
                  <input type="radio" checked={!(editAdvert.isExpired)}
                    onChange={ e => setEditAdvert(prev => ({ ...prev, isExpired: !e.target.checked })) }
                  /> No
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Edit advert" />
        </form>
      }
    </>
  );
}

export default EditAdvert;
