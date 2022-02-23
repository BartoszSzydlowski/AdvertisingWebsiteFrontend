import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Routes from './Routes';

export const UserDataContext = createContext({ username: '', userRole: '' });
//export const RoleContext = createContext('');

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const getUserData = () => {
    axios
      .get('https://localhost:44320/api/Identity/GetUserNameAndRole', {
        headers: {
          Authorization: `Bearer ${Cookies.get('Token')}`
        }
      })
      .then(response => {
        setUsername(response.data.username);
        setUserRole(response.data.role);
      });
  };

  useEffect(() => {
    if (Cookies.get('Token')) {
      setIsLoggedIn(true);
      getUserData();
    }
  }, [isLoggedIn]);

  const handleLogin = (token: string, expiration: Date) => {
    if (!token) {
      return;
    }
    Cookies.set('Token', token, { expires: new Date(expiration) });
    setIsLoggedIn(true);
    getUserData();
  };

  const handleLogout = () => () => {
    setIsLoggedIn(false);
    Cookies.remove('Token');
    getUserData();
    toast('Successfully logged out');
  };

  return (
    <UserDataContext.Provider
      value={{ username: username, userRole: userRole }}
    >
      <div className="App" style={{ height: '100%' }}>
        <Routes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        theme="dark"
        pauseOnFocusLoss={false}
      />
    </UserDataContext.Provider>
  );
};

export default App;
