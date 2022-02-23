import React, { SyntheticEvent, useState } from 'react';
import LoginModel from '../../interfaces/user/user';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import getUrl from '../../endpoints/getUrl';

interface ILoginFormProps {
  handleLogin: (token: string, expiration: Date) => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<ILoginFormProps> = props => {
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
      .post(`${getUrl()}/api/Identity/Login`, JSON.stringify(userLogin), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        setIsPending(false);
        props.setIsLoggedIn(true);
        props.handleLogin(res.data.token, res.data.expiration);
        history.push('/');
      })
      .then(() => {
        toast(`Successfully logged in`);
      })
      .catch(() => {
        setIsPending(false);
        toast.error('Failed to login');
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
            <input type="submit" value="Login" className="btn btn-dark" />
          )}
          {isPending && (
            <input
              type="submit"
              value="Login"
              className="btn btn-dark"
              disabled
            />
          )}
        </form>
        <Link to="/forgotPassword">Forgot password?</Link>
      </div>
    </div>
  );
};

export default LoginForm;
