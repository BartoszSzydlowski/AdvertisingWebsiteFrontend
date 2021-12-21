/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, { useEffect } from 'react';
import Endpoints from '../../endpoints/endpoints';

const ConfirmEmailPage = () => {
  const url = window.location.search;
  const query = new URLSearchParams(url);
  const userId = query.get('userId');
  const token = query.get('token');

  useEffect(() => {
    axios.post(`${Endpoints.defaultEndpoint}/api/identity/confirmemail?userId=${userId}&token=${token}`)
      .then(response => {
      console.log(response);
    });
  }, []);

  return (
    <div>
      <div>Account successfully confirmed</div>
    </div>
  );
};

export default ConfirmEmailPage;
