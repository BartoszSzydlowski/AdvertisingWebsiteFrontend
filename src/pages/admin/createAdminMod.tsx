import axios from 'axios';
import React, { useState } from 'react';
import RegisterModel from '../../interfaces/user/user';
import { toast } from 'react-toastify';
import getUrl from '../../endpoints/getUrl';

const CreateAdminMod: React.FC = () => {
  const [newUser, setNewUser] = useState<RegisterModel>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [userrank, setUserrank] = useState<string>('Administrator');
  const [errors, setErrors] = useState<string[]>([]);

  const register = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsPending(true);
    if (userrank === 'Administrator') {
      axios
        .post(
          `${getUrl()}/api/Identity/RegisterAdmin`,
          JSON.stringify(newUser),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          setIsPending(false);
        })
        .catch(error => {
          setIsPending(false);
          toast.error(error.response.data.message);
          setErrors(error.response.data.errors);
        });
    }
    if (userrank === 'Moderator') {
      axios
        .post(`${getUrl()}/api/Identity/RegisterMod`, JSON.stringify(newUser), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          setIsPending(false);
        })
        .catch(error => {
          setIsPending(false);
          toast.error(error.response.data.message);
          setErrors(error.response.data.errors);
        });
    }
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
      <div style={{ border: '1px solid gray', padding: '20px' }}>
        <form onSubmit={register}>
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={e =>
                setNewUser(prev => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div style={{ margin: '10px 0' }}>
            <input
              className="form-control"
              type="email"
              placeholder="E-mail"
              value={newUser.email}
              onChange={e =>
                setNewUser(prev => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div style={{ margin: '10px 0' }}>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={e =>
                setNewUser(prev => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div>
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              value={newUser.confirmPassword}
              onChange={e =>
                setNewUser(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))
              }
            />
          </div>

          <div
            style={{ margin: '10px 0' }}
            className="btn-group btn-group-toggle"
          >
            <input
              className="btn-check"
              id="adminOption"
              type="radio"
              value="Administrator"
              name="userrank"
              onChange={e => setUserrank(e.target.value)}
              checked={userrank === 'Administrator'}
              autoComplete="off"
            />
            <label className="btn btn-secondary" htmlFor="adminOption">
              Administrator
            </label>
            <input
              className="btn-check"
              id="modOption"
              type="radio"
              value="Moderator"
              name="userrank"
              onChange={e => setUserrank(e.target.value)}
              checked={!(userrank === 'Administrator')}
              autoComplete="off"
            />
            <label className="btn btn-secondary" htmlFor="modOption">
              Moderator
            </label>
          </div>

          <div>
            {!isPending && (
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
              />
            )}
            {isPending && (
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
                disabled
              />
            )}
          </div>
        </form>
        {errors && errors.map((error, index) => <p key={index}>{error}</p>)}
      </div>
    </div>
  );
};

export default CreateAdminMod;
