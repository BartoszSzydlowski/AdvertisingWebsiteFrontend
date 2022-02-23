import React, { useState } from 'react';
import { ICreateAdvert } from '../../interfaces/advert/advert';
import GetCategory from '../../components/category/categorySelect';
import axios from 'axios';
import Cookies from 'js-cookie';
import PhotoInput from '../../components/photoInput/photoInput';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import getUrl from '../../endpoints/getUrl';

const Create: React.FC = () => {
  const [advert, setAdvert] = useState<ICreateAdvert>({
    name: '',
    description: '',
    price: 0,
    categoryId: 1
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [photoInputs, setPhotoInputs] = useState<{ checked: boolean }[]>([
    { checked: false }
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  const onChecked = (input: number) => {
    const getCheckedPhotoInputs = [...photoInputs];
    getCheckedPhotoInputs[input].checked =
      !getCheckedPhotoInputs[input].checked;
    setPhotoInputs(getCheckedPhotoInputs);
  };

  const addInput = () => {
    const newInput = [...photoInputs, { checked: false }];
    setPhotoInputs(newInput);
  };

  const deleteInputs = () => {
    setPhotoInputs(photoInputs.filter(e => !e.checked));
  };

  const addPicture = async (advertId: number) => {
    const pictures = document.getElementsByClassName('files');
    const formData = new FormData();
    const token = Cookies.get('Token');
    Array.prototype.forEach.call(pictures, picture => {
      formData.append('files', picture.files[0], picture.files[0].filename);
    });

    await axios
      .post(
        `${getUrl}/api/pictures?` +
          new URLSearchParams({ advertId: advertId.toString() }),
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(() => {
        history.push(`/adverts/${advertId}`);
      })
      .catch(() => {
        history.push(`/adverts/${advertId}`);
      });
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsPending(true);

    const token = Cookies.get('Token');

    await axios
      .post(`${getUrl()}/api/adverts`, JSON.stringify(advert), {
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
        setErrors(error.response.data.errors);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div
      style={{
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form
        onSubmit={submit}
        style={{
          border: '1px solid black',
          padding: '20px',
          borderRadius: '10px'
        }}
      >
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td style={{ textAlign: 'left' }}>
                <label className="col-form-label">Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={advert.name}
                  onChange={e =>
                    setAdvert(prev => ({ ...prev, name: e.target.value }))
                  }
                />
              </td>
            </tr>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td style={{ textAlign: 'left' }}>
                <label className="col-form-label">Description: </label>
              </td>
              <td>
                <textarea
                  className="form-control"
                  value={advert.description}
                  onChange={e =>
                    setAdvert(prev => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                />
              </td>
            </tr>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td style={{ textAlign: 'left' }}>
                <label className="col-form-label">Price: </label>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={advert.price}
                  onChange={e =>
                    setAdvert(prev => ({
                      ...prev,
                      price: parseInt(e.target.value)
                    }))
                  }
                />
              </td>
            </tr>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td style={{ textAlign: 'left' }}>
                <label>Category: </label>
              </td>
              <td>
                <GetCategory
                  style={{ width: '100%' }}
                  onChange={e => {
                    setAdvert(prev => ({
                      ...prev,
                      categoryId: parseInt(e.target.value)
                    }));
                  }}
                />
              </td>
            </tr>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td colSpan={2}>
                {photoInputs.map((photoInput, index) => {
                  return (
                    <PhotoInput
                      key={index}
                      checked={photoInput.checked}
                      onChecked={() => onChecked(index)}
                    />
                  );
                })}
              </td>
            </tr>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td>
                <input
                  className="btn btn-dark"
                  type="button"
                  onClick={addInput}
                  value="Add more photos"
                />
              </td>
              <td>
                <input
                  className="btn btn-dark"
                  type="button"
                  onClick={deleteInputs}
                  value="Delete photos"
                />
              </td>
            </tr>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td colSpan={2}>
                {!isPending && (
                  <input
                    className="btn btn-dark"
                    type="submit"
                    value="Add advert"
                  />
                )}
                {isPending && (
                  <input
                    className="btn btn-dark"
                    type="submit"
                    value="Add advert"
                    disabled={true}
                  />
                )}
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
        <div></div>
      </form>
    </div>
  );
};

export default Create;
