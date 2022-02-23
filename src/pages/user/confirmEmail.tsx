import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getUrl from '../../endpoints/getUrl';

const ConfirmEmailPage: React.FC = () => {
  const url = window.location.search;
  const query = new URLSearchParams(url);
  const email = query.get('userEmail');
  const token = query.get('token');
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    axios
      .post(
        `${getUrl()}/api/identity/confirmemail?email=${email}&token=${token}`
      )
      .then(response => {
        setResponse(response.data.message);
      });
  }, []);

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
      <div>{response}</div>
    </div>
  );
};

export default ConfirmEmailPage;
