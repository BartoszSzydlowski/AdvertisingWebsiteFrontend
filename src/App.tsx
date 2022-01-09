import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import BootstrapNavbar from './components/navbar/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Create from './pages/advert/addAdvertForm';
import LoginForm from './pages/user/loginForm';
import Cookies from 'js-cookie';
import RegisterForm from './pages/user/registerForm';
import PagedAdverts from './pages/advert/pagedAdverts';
import ConfirmEmailPage from './pages/user/confirmEmail';
import ForgotPasswordForm from './pages/user/forgotPassword';
import RecoverPasswordForm from './pages/user/recoverPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SingleAdvert from './pages/advert/singleAdvert';
import { ToastContainer } from 'react-toastify';
import UserAdverts from './pages/advert/userAdverts';

export const UserDataContext = createContext({ username: '', userRole: '' });
//export const RoleContext = createContext('');

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const getUserRole = () => {
    axios
      .get('https://localhost:44320/api/Identity/GetUserRole', {
        headers: {
          Authorization: `Bearer ${Cookies.get('Token')}`
        }
      })
      .then(response => {
        setUserRole(response.data.role);
        //console.log(response.data.role);
      });
  };

  const getUserName = () => {
    axios
      .get('https://localhost:44320/api/Identity/GetUserName', {
        headers: {
          Authorization: `Bearer ${Cookies.get('Token')}`
        }
      })
      .then(response => {
        setUsername(response.data.username);
      });
  };

  useEffect(() => {
    if (Cookies.get('Token')) {
      setIsLoggedIn(true);
      getUserRole();
      getUserName();
    }
  }, [isLoggedIn]);

  const handleLogin = (token: string, expiration: Date) => {
    if (!token) {
      return;
    }
    Cookies.set('Token', token, { expires: new Date(expiration) });
    setIsLoggedIn(true);
    getUserRole();
    getUserName();
  };

  const handleLogout = () => () => {
    setIsLoggedIn(false);
    Cookies.remove('Token');
    getUserRole();
    getUserName();
  };

  return (
    <UserDataContext.Provider
      value={{ username: username, userRole: userRole }}
    >
      <div className="App" style={{ height: '100%' }}>
        <Router>
          <BootstrapNavbar isLoggedIn={isLoggedIn} logout={handleLogout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/createAdvert" component={Create} />
            {/* <Route path="/login" component={(props: any) => <LoginForm {...props} handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />} /> */}
            <Route
              path="/login"
              component={(props: {
                handleLogin: () => void;
                setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
              }) => (
                <LoginForm
                  {...props}
                  handleLogin={handleLogin}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            />
            <Route path="/register" component={RegisterForm} />
            <Route path="/confirmEmail" component={ConfirmEmailPage} />
            <Route path="/forgotPassword" component={ForgotPasswordForm} />
            <Route path="/recoverPassword" component={RecoverPasswordForm} />
            <Route path="/adverts/:id" component={SingleAdvert} />
            <Route path="/adverts" component={PagedAdverts} />
            <Route path="/myAdverts" component={UserAdverts} />
            <Route path="/editAdvert/:id" />
            <Route path="/createAdmin" />
            <Route path="/createMod" />
          </Switch>
        </Router>
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
      />
    </UserDataContext.Provider>
  );
};

export default App;
