import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Create from './pages/advert/addAdvertForm';
import LoginForm from './pages/user/loginForm';
import Cookies from 'js-cookie';
import RegisterForm from './pages/user/registerForm';
import PagedAdverts from './pages/pagedAdverts';
import ConfirmEmailPage from './pages/user/confirmEmail';
import ForgotPasswordForm from './pages/user/forgotPassword';
import RecoverPasswordForm from './pages/user/recoverPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (Cookies.get('Token')) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogin = (token: string, expiration: Date) => {
    if (!token) {
      return;
    }
    Cookies.set('Token', token, { expires: new Date(expiration) });
    setIsLoggedIn(true);
  };

  const handleLogout = () => () => {
    setIsLoggedIn(false);
    Cookies.remove('Token');
  };

  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} logout={handleLogout} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/pagedAdverts" component={PagedAdverts} />
          <Route path="/createAdvert" component={Create} />
          <Route
            path="/login"
            component={(props: any) => (
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
