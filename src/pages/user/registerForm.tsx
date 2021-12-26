import axios from 'axios';
import React, { useState } from 'react';
import Endpoints from '../../endpoints/endpoints';
import RegisterModel from '../../interfaces/user/user';

const RegisterForm = () => {
  const [newUser, setNewUser] = useState<RegisterModel>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isPending, setIsPending] = useState<boolean>(false);

  const register = (e: any) => {
    e.preventDefault();
    setIsPending(true);
    axios
      .post(`${Endpoints.defaultEndpoint}/api/Identity/Register`, JSON.stringify(newUser), {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        setIsPending(false);
      })
      .catch(error => {
        setIsPending(false);
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={register}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={e =>
              setNewUser(prev => ({ ...prev, username: e.target.value }))
            }
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={newUser.email}
            onChange={e =>
              setNewUser(prev => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        <div>
          <input
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
            type="password"
            placeholder="Confirm Password"
            value={newUser.confirmPassword}
            onChange={e =>
              setNewUser(prev => ({ ...prev, confirmPassword: e.target.value }))
            }
          />
        </div>

        {!isPending && <button>Register</button>}
        {isPending && <button disabled>Register in progress</button>}
      </form>
    </div>
  );
};

export default RegisterForm;
