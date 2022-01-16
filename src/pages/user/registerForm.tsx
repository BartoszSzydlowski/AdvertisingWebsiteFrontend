import axios from 'axios';
import React, { useState } from 'react';
import Endpoints from '../../endpoints/endpoints';
import RegisterModel from '../../interfaces/user/user';

const RegisterForm: React.FC = () => {
  const [newUser, setNewUser] = useState<RegisterModel>({ username: '', email: '', password: '', confirmPassword: '' });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const register = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsPending(true);
    axios.post(`${Endpoints.defaultEndpoint}/Identity/Register`, JSON.stringify(newUser), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setIsPending(false);
    })
    .catch(error => {
      setIsPending(false);
      console.log(error.response.data);
      setErrors(error.response.data.errors);
    });
  };

  return (
    <div>
      <form onSubmit={register}>
        <div>
          <input type="text" placeholder="Username" value={newUser.username} onChange={e => setNewUser(prev => ({ ...prev, username: e.target.value }))} />
        </div>

        <div>
          <input type="email" placeholder="E-mail" value={newUser.email} onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))} />
        </div>

        <div>
          <input type="text" placeholder="Phone number" value={newUser.phoneNumber} onChange={e => setNewUser(prev => ({ ...prev, phoneNumber: e.target.value }))} />
        </div>

        <div>
          <input type="password" placeholder="Password" value={newUser.password} onChange={e => setNewUser(prev => ({ ...prev, password: e.target.value }))} />
        </div>

        <div>
          <input type="password" placeholder="Confirm Password" value={newUser.confirmPassword} onChange={e => setNewUser(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />
        </div>

        {/* {!isPending && <button>Register</button>}
        {isPending && <button disabled>Register</button>} */}
        {errors && errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
        {!isPending && <input type="submit" value="Register" />}
        {isPending && <input type="submit" value="Register" disabled />}
      </form>
    </div>
  );
};

export default RegisterForm;
