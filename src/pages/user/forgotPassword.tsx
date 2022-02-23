import axios from 'axios';
import React, { useState } from 'react';
import getUrl from '../../endpoints/getUrl';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const recover = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post(
        `${getUrl()}/api/Identity/ForgotPassword?email=${email}`,
        JSON.stringify(email),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        setMessage(response.data.message);
        setSuccess(true);
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
  }

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
        onSubmit={recover}
        style={{
          border: '1px solid black',
          padding: '20px',
          borderRadius: '5px'
        }}
      >
        <div>
          <label style={{ marginBottom: '10px' }}>Enter your email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          style={{ marginTop: '10px' }}
          type="submit"
          className="btn btn-dark"
          value="Recover"
        />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
