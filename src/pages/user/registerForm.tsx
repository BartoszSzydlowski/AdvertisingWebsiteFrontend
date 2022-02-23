import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import getUrl from '../../endpoints/getUrl';
import RegisterModel from '../../interfaces/user/user';

const RegisterForm: React.FC = () => {
  const [newUser, setNewUser] = useState<RegisterModel>({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const register = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsPending(true);
    axios
      .post(`${getUrl()}/api/Identity/Register`, JSON.stringify(newUser), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setIsPending(false);
        setSuccess(true);
        setMessage(response.data.message);
      })
      .catch(error => {
        setIsPending(false);
        toast.error('Error registering. Please check errors and try again');
        setErrors(error.response.data.errors);
      });
  };

  if (success) {
    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: '1.5rem'
        }}
      >
        {message}
      </div>
    );
  } else {
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
          <span style={{ fontSize: '2rem' }}>Register</span>
          <form onSubmit={register} style={{ padding: '10px' }}>
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
                type="text"
                placeholder="Phone number"
                value={newUser.phoneNumber}
                onChange={e =>
                  setNewUser(prev => ({ ...prev, phoneNumber: e.target.value }))
                }
              />
            </div>

            <div>
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

            <div style={{ margin: '10px 0' }}>
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
            {errors && errors.map((error, index) => <p key={index}>{error}</p>)}
            {!isPending && (
              <input className="btn btn-dark" type="submit" value="Register" />
            )}
            {isPending && (
              <input
                className="btn btn-dark"
                type="submit"
                value="Register"
                disabled
              />
            )}
          </form>
        </div>
      </div>
    );
  }
};

export default RegisterForm;
