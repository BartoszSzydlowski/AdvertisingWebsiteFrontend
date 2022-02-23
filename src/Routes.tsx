//imports
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BootstrapNavbar from './components/navbar/navbar';

//components
import Home from './pages';
import About from './pages/about';
import ManageAdverts from './pages/admin/adverts/manageAdverts';
import ShowPendingAdverts from './pages/admin/adverts/showPendingAdverts';
import Categories from './pages/admin/categories/categories';
import CreateCategory from './pages/admin/categories/createCategory';
import EditCategoryForm from './pages/admin/categories/editCategory';
import SingleCategory from './pages/admin/categories/singleCategory';
import CreateAdminMod from './pages/admin/createAdminMod';
import Create from './pages/advert/addAdvertForm';
import EditAdvert from './pages/advert/editAdvert';
import PagedAdverts from './pages/advert/pagedAdverts';
import SearchAdverts from './pages/advert/searchAdverts';
import ShowByAdvertsCategory from './pages/advert/showAdvertsByCategory';
import ShowSearchResult from './pages/advert/showSearchResults';
import SingleAdvert from './pages/advert/singleAdvert';
import UserAdverts from './pages/advert/userAdverts';
import ConfirmEmailPage from './pages/user/confirmEmail';
import ForgotPasswordForm from './pages/user/forgotPassword';
import LoginForm from './pages/user/loginForm';
import ManageAccount from './pages/user/manageAccount';
import RecoverPasswordForm from './pages/user/recoverPassword';
import RegisterForm from './pages/user/registerForm';

interface IRoutesProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => () => void;
  handleLogin: (token: string, expiration: Date) => void;
}

const Routes: React.FC<IRoutesProps> = props => {
  return (
    <Router>
      <BootstrapNavbar
        isLoggedIn={props.isLoggedIn}
        handleLogout={props.handleLogout}
      />
      <Switch>
        <Route exact path="/" component={Home} />

        <Route path="/about" component={About} />
        <Route path="/createAdvert" component={Create} />
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
        <Route path="/createAdminMod" component={CreateAdminMod} />

        <Route path="/adverts/:id" component={SingleAdvert} />
        <Route path="/adverts" component={PagedAdverts} />
        <Route path="/myAdverts" component={UserAdverts} />
        <Route path="/editAdvert/:id" component={EditAdvert} />
        <Route path="/showByCategory/:id" component={ShowByAdvertsCategory} />
        <Route path="/manageAdverts" component={ManageAdverts} />
        <Route path="/searchAdverts" component={SearchAdverts} />
        <Route path="/showPending" component={ShowPendingAdverts} />
        <Route path="/search" component={ShowSearchResult} />

        <Route path="/categories/:id" component={SingleCategory} />
        <Route path="/categories" component={Categories} />
        <Route path="/createCategory" component={CreateCategory} />
        <Route path="/editCategory/:id" component={EditCategoryForm} />

        <Route path="/manageAccount" component={ManageAccount} />
      </Switch>
    </Router>
  );
};

export default Routes;
