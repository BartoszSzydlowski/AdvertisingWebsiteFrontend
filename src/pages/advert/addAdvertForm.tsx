import React, { useState } from 'react';
import Endpoints from '../../endpoints/endpoints';
import { ICreateAdvert } from '../../interfaces/advert/advert';
import GetCategory from '../../components/category/category';
import axios from 'axios';
import Cookies from 'js-cookie';
import PhotoInput from '../../components/photoInput/photoInput';

const Create: React.FC = () => {
  const [advert, setAdvert] = useState<ICreateAdvert>({
    name: '',
    description: '',
    price: 0,
    categoryId: 1
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [photoInputs, setPhotoInputs] = useState<any>([{ checked: false }]);

  const onChecked = (input: number) => {
    const getCheckedPhotoInputs = [...photoInputs];
    getCheckedPhotoInputs[input].checked = !getCheckedPhotoInputs[input].checked;
    setPhotoInputs(getCheckedPhotoInputs);
  };

  const addInput = () => {
    const newInput = [...photoInputs, { checked: false }];
    setPhotoInputs(newInput);
  };

  const deleteInputs = () => {
    setPhotoInputs(photoInputs.filter((e: any) => !e.checked));
  };
  //console.log(advert);

  const addPicture = async (advertId: number) => {
    const pictures = document.getElementsByClassName('files');
    const formData = new FormData();
    const token = Cookies.get('Token');
    Array.prototype.forEach.call(pictures, picture => {
      formData.append('files', picture.files[0], picture.files[0].filename);
    });

    await axios
      .post(
        `${Endpoints.defaultEndpoint}/pictures?` +
          new URLSearchParams({ advertId: advertId.toString() }),
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(data => {
        console.log(data.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsPending(true);

    const token = Cookies.get('Token');

    await axios.post(`${Endpoints.defaultEndpoint}/adverts`, JSON.stringify(advert), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(async data => {
      await addPicture(data.data.data.id);
      setIsPending(false);
    })
    .catch(error => {
      setIsPending(false);
      console.log(error);
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <label>Name: </label>
              </td>
              <td>
                <input type="text" value={advert.name} onChange={ e => setAdvert(prev => ({...prev, name: e.target.value })) } />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <label>Description: </label>
              </td>
              <td>
                <input type="text" value={advert.description} onChange={ e => setAdvert(prev => ({ ...prev, description: e.target.value })) } />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <label>Price: </label>
              </td>
              <td>
                <input type="text" value={advert.price} onChange={ e => setAdvert(prev => ({ ...prev, price: parseInt(e.target.value) })) } />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: 'left' }}>
                <label>Category: </label>
              </td>
              <td>
                <GetCategory onChange={(e: any) => { setAdvert(prev => ({ ...prev, categoryId: parseInt(e.target.value) })) }} />
              </td>
            </tr>
          </tbody>
        </table>
        {photoInputs.map((photoInput: any, inputNumber: number) => {
          return (
            <PhotoInput key={inputNumber} checked={photoInput.checked} onChecked={() => onChecked(inputNumber)} />
          );
        })}
        <div>
          {!isPending && <input type="submit" value="Add advert" />}
          {isPending && <input type="submit" value="Adding advert" disabled={true} />}
        </div>
      </form>
      <div style={{ marginTop: '5px' }}>
        <input type="submit" onClick={addInput} value="Add more photos" />
        <input type="submit" onClick={deleteInputs} value="Delete photos" />
      </div>
    </div>
  );
};

export default Create;
