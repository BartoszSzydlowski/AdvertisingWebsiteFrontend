import React, { SyntheticEvent, useState } from 'react';
import LoginModel from '../../interfaces/user/user';
import axios from 'axios';
import Endpoints from '../../endpoints/endpoints';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = ({ handleLogin, setIsLoggedIn }: any) => {
  const [userLogin, setUserLogin] = useState<LoginModel>({
    username: '',
    password: ''
  });
  const [isPending, setIsPending] = useState<boolean>(false);

  const history = useHistory();

  const auth = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsPending(true);
    axios
      .post(
        `${Endpoints.defaultEndpoint}/api/Identity/Login`,
        JSON.stringify(userLogin),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        setIsPending(false);
        setIsLoggedIn(true);
        //console.log(res.data);
        handleLogin(res.data.token, res.data.expiration);
        history.push('/');
      })
      .catch(error => {
        setIsPending(false);
        //console.log(error);
        toast.error('Invalid login or password.');
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
      <div style={{ border: '1px solid gray', padding: '20px' }}>
        <span style={{ fontSize: '2rem' }}>Login panel</span>
        <form onSubmit={auth} style={{ padding: '10px' }}>
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={userLogin.username}
              onChange={e =>
                setUserLogin(prev => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div style={{ margin: '10px 0' }}>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={userLogin.password}
              onChange={e =>
                setUserLogin(prev => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          {!isPending && (
            <button className="btn btn-outline-secondary">Login</button>
          )}
          {isPending && (
            <button className="btn btn-outline-secondary" disabled>
              Login
            </button>
          )}
        </form>
        <a href="/forgotPassword">Forgot password?</a>
      </div>
    </div>
  );
};

export default LoginForm;
