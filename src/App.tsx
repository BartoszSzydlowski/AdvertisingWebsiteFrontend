import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "./components/navbar/navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about';
import Create from "./pages/advert/addAdvertForm";
import LoginForm from "./pages/loginForm";
import Cookies from "js-cookie";
import RegisterForm from "./pages/registerForm";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if(Cookies.get('Token')){
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);

    const handleLogin = (token: any, expiration: any) => {
        if(!token) {
            return
        };
        Cookies.set('Token', token, {expires: new Date(expiration)});
        setIsLoggedIn(true);
    };

    const handleLogout = () => () => {
        setIsLoggedIn(false);
        Cookies.remove('Token');
    };

    return (
        <div className='App'>
            <Router>
                <Navbar isLoggedIn={isLoggedIn} logout={handleLogout}/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/createAdvert" component={Create}/>
                    <Route exact path="/login" component={(props: any) => <LoginForm {...props} handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route exact path="/register" component={RegisterForm}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
