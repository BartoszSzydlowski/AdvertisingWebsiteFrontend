import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about';
import Create from "./pages/advert/addAdvert";
import Login from "./pages/login";
import Cookies from "js-cookie";
import { useCookies, withCookies } from "react-cookie";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies(['Token']);

    useEffect(() => {
        // if(localStorage.getItem('Token')) {
        //     setIsLoggedIn(true);
        // }
        if(cookies['Token']){
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (token: any, expiration: any) => {
        if(!token) {
            return
        };
        //Cookies.set('Token', token, {expires: new Date(expiration)});
        setCookie('Token', token, {expires: new Date(expiration)})
        //localStorage.setItem('Token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => () => {
        setIsLoggedIn(false);
        //Cookies.remove('Token', { path: '/Z', domain: 'localhost' })
        removeCookie('Token');
        //localStorage.clear();
    };

    return (
        <div className='App'>
            <Router>
                <Navbar isLoggedIn={isLoggedIn} logout={handleLogout}/>
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/createAdvert" component={Create}/>
                    <Route path="/login" component={(props: any) => <Login {...props} handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn}/>}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
