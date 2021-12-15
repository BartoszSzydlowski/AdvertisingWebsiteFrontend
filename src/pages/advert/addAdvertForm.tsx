import React, { useState } from 'react';
import Endpoints from '../../endpoints/endpoints';
import { CreateAdvert } from '../../interfaces/advert/advert';
import GetCategory from '../../components/category/category';
import axios from 'axios';
import Cookies from 'js-cookie';
import Input from '../../components/photoInput/photoInput';

const Create = () => {
  const [advert, setAdvert] = useState<CreateAdvert>({
    name: '',
    description: '',
    price: 0,
    categoryId: 1
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [inputList, setInputList] = useState<any>([]);

  //console.log(advert);

  const addPicture = async (advertId: any) => {
    const pictures = document.getElementsByClassName('files');
    const formData = new FormData();
    const token = Cookies.get('Token');
    Array.prototype.forEach.call(pictures, picture => {
      formData.append('files', picture.files[0], picture.files[0].filename);
    });

    await axios
      .post(`${Endpoints.defaultEndpoint}/api/pictures?` + new URLSearchParams({ advertId: advertId }), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(data => {
        console.log(data.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    setIsPending(true);

    const token = Cookies.get('Token');

    await axios
      .post(`${Endpoints.defaultEndpoint}/api/adverts`, JSON.stringify(advert), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(async data => {
        await addPicture(data.data.data.id);
        setIsPending(false);
        //console.log(data.data.data.id);
      })
      .catch(error => {
        setIsPending(false);
        console.log(error);
      });
  };

  const addPhotoInput = (event: any) => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  return (
    <div style={{ margin: '5px' }}>
      <form onSubmit={submit}>
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <label>Name: </label>
              </td>
              <td>
                <input type="text" value={advert.name} onChange={e => setAdvert(prev => ({ ...prev, name: e.target.value }))} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <label>Description: </label>
              </td>
              <td>
                <input type="text" value={advert.description} onChange={e => setAdvert(prev => ({ ...prev, description: e.target.value }))} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <label>Price: </label>
              </td>
              <td>
                <input type="text" value={advert.price} onChange={e => setAdvert(prev => ({ ...prev, price: parseInt(e.target.value) }))} />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <label>Category: </label>
              </td>
              <td>
                <GetCategory
                  event={(e: any) => {
                    setAdvert(prev => ({ ...prev, categoryId: parseInt(e.target.value) }));
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {!isPending && <button>Add advert</button>}
        {isPending && <button disabled>Adding advert</button>}
        {inputList}
      </form>
      <input onClick={addPhotoInput} type="button" value="Add another photo" id="addAnotherPhoto" />
    </div>
  );
};

export default Create;
