import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import getUrl from '../../endpoints/getUrl';

const RecoverPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const url = window.location.search;
  const query = new URLSearchParams(url);
  const email = query.get('userEmail');
  const token = query.get('token');

  const data = {
    email: email,
    token: token,
    password: password,
    confirmPassword: confirmPassword
  };

  const recoverPassword = (e: SyntheticEvent) => {
    e.preventDefault();
    axios.post(
      `${getUrl()}/api/Identity/RecoverPassword`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
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
        onSubmit={recoverPassword}
        style={{
          border: '1px solid black',
          padding: '20px',
          borderRadius: '5px'
        }}
      >
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td>New password: </td>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-control"
                />
              </td>
            </tr>
            <tr style={{ borderBottom: '10px solid transparent' }}>
              <td>Confirm password: </td>
              <td>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <input
                  type="submit"
                  value="Update password"
                  className="btn btn-dark"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default RecoverPasswordForm;
