import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getUrl from '../../endpoints/getUrl';
import UserData from '../../interfaces/user/user';

const ManageAccount: React.FC = () => {
  const [userData, setUserData] = useState<UserData>();
  const [email, setEmail] = useState<{ email: string }>({ email: '' });
  const [phoneNumber, setPhoneNumber] = useState<{ phoneNumber: string }>({
    phoneNumber: ''
  });
  const [password, setPassword] = useState<{
    password: string;
    confirmPassword: string;
  }>({ password: '', confirmPassword: '' });

  const fetchUserData = () => {
    const token = Cookies.get('Token');
    axios
      .get(`${getUrl()}/api/Identity/GetUserData`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUserData(response.data);
        setEmail({ email: response.data.email });
        setPhoneNumber({ phoneNumber: response.data.phoneNumber });
      });
  };

  const changePassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = Cookies.get('Token');
    axios
      .put(
        `${getUrl()}/api/identity/updatepassword`,
        JSON.stringify(password),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => {
        toast('Successfully changed password');
        setPassword({ password: '', confirmPassword: '' });
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const changeEmail = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = Cookies.get('Token');
    axios
      .put(`${getUrl()}/api/identity/updateemail`, JSON.stringify(email), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        toast('Successfully changed email');
        setEmail({ email: '' });
      });
  };

  const changePhoneNumber = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = Cookies.get('Token');
    axios
      .put(`${getUrl()}/api/identity/updateemail`, JSON.stringify(email), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        toast('Successfully changed phone number');
        setEmail({ email: '' });
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      style={{
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      {userData && (
        <form onSubmit={changeEmail} style={{ padding: '10px' }}>
          <div style={{ border: '1px solid black', padding: '20px' }}>
            <div>
              <span style={{ fontSize: '1.5rem' }}>Email</span>
              <div>
                <input
                  className="form-control"
                  type="email"
                  value={email.email}
                  onChange={e => setEmail({ email: e.target.value })}
                />
              </div>
            </div>
            <div style={{ margin: '10px 0' }}>
              <input
                className="btn btn-dark"
                type="submit"
                value="Change email"
              />
            </div>
          </div>
        </form>
      )}
      {userData && (
        <form onSubmit={changePhoneNumber} style={{ padding: '10px' }}>
          <div style={{ border: '1px solid black', padding: '20px' }}>
            <div>
              <span style={{ fontSize: '1.5rem' }}>Phone number</span>
              <div>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber.phoneNumber}
                  onChange={e =>
                    setPhoneNumber({ phoneNumber: e.target.value })
                  }
                />
              </div>
            </div>
            <div style={{ margin: '10px 0' }}>
              <input
                className="btn btn-dark"
                type="submit"
                value="Change phone number"
              />
            </div>
          </div>
        </form>
      )}
      <form onSubmit={changePassword} style={{ padding: '10px' }}>
        <div style={{ border: '1px solid black', padding: '20px' }}>
          <div>
            <span style={{ fontSize: '1.5rem' }}>Password</span>
            <div>
              <input
                className="form-control"
                type="password"
                value={password.password}
                onChange={e =>
                  setPassword({ ...password, password: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <span style={{ fontSize: '1.5rem' }}>Confirm password</span>
            <div>
              <input
                className="form-control"
                type="password"
                value={password.confirmPassword}
                onChange={e =>
                  setPassword({ ...password, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
          <div style={{ margin: '10px 0' }}>
            <input
              className="btn btn-dark"
              type="submit"
              value="Change password"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageAccount;
