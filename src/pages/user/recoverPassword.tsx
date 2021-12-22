import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Endpoints from '../../endpoints/endpoints';

const RecoverPasswordForm = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const url = window.location.search;
  const query = new URLSearchParams(url);
  const email = query.get('userEmail');
  const token = query.get('token');

  // useEffect(() => {
  //   console.log(userEmail);
  //   console.log(token);
  // });

  const data = {
    email: email,
    token: token,
    password: password,
    confirmPassword: confirmPassword
  };

  console.log(data);

  const recoverPassword = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .post(
        `${Endpoints.defaultEndpoint}/api/Identity/RecoverPassword`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={recoverPassword}>
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <td>New password: </td>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Confirm password: </td>
              <td>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Update password" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default RecoverPasswordForm;
