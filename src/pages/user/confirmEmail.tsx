/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Endpoints from '../../endpoints/endpoints';

const ConfirmEmailPage = () => {
  const url = window.location.search;
  const query = new URLSearchParams(url);
  const email = query.get('userEmail');
  const token = query.get('token');
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    axios.post(`${Endpoints.defaultEndpoint}/api/identity/confirmemail?email=${email}&token=${token}`)
      .then(response => {
      console.log(response);
      setResponse(response.data.message);
    });
  }, []);

  return (
    <div>
      <div>{response}</div>
    </div>
  );
};

export default ConfirmEmailPage;
