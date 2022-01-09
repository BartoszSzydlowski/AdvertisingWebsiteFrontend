import axios from 'axios';
import React, { useState } from 'react';
import Endpoints from '../../endpoints/endpoints';
import RegisterModel from '../../interfaces/user/user';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>('');

  const register = (e: any) => {
    e.preventDefault();
    // const url = window.location.search;
    // const query = new URLSearchParams(url);
    // const email = query.get('email');
    axios
      .post(`${Endpoints.defaultEndpoint}/api/Identity/ForgotPassword?email=${email}`, JSON.stringify(email), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={register}>
        <div>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <button>Recover password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
