import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BootstrapNavbar from './components/navbar/navbar';
import Home from './pages';
import About from './pages/about';
import CategoriesPanel from './pages/admin/categories/categoriesPanel';
import CreateAdminMod from './pages/admin/createAdminMod';
import Create from './pages/advert/addAdvertForm';
import PagedAdverts from './pages/advert/pagedAdverts';
import SingleAdvert from './pages/advert/singleAdvert';
import UserAdverts from './pages/advert/userAdverts';
import ConfirmEmailPage from './pages/user/confirmEmail';
import ForgotPasswordForm from './pages/user/forgotPassword';
import LoginForm from './pages/user/loginForm';
import RecoverPasswordForm from './pages/user/recoverPassword';
import RegisterForm from './pages/user/registerForm';

interface IRoutesProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => () => void;
  handleLogin: (token: string, expiration: Date) => void;
}

const Routes: React.FC<IRoutesProps> = (props) => {
  return (
    <Router>
      <BootstrapNavbar isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/createAdvert" component={Create} />
        {/* <Route path="/login" component={(props: any) => <LoginForm {...props} handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />} /> */}
        <Route
          path="/login"
          component={() => (
            <LoginForm
              handleLogin={props.handleLogin}
              setIsLoggedIn={props.setIsLoggedIn}
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
        <Route path="/createAdminMod" component={CreateAdminMod}/>
        <Route path="/categories/:id" component={CategoriesPanel}/>
        <Route path="/categories" component={CategoriesPanel}/>
        <Route path="/createCategory" component={CategoriesPanel}/>
        <Route path="/showByCategories" component={CategoriesPanel}/>
      </Switch>
    </Router>
  )
}

export default Routes;
