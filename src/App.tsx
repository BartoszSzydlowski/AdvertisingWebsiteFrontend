import React, { useState } from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about';
import Create from "./pages/advert/addAdvert";
import Login from "./pages/login";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <Router>
    <Navbar props={isLogged}/>
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/createAdvert" component={Create} />
      <Route path="/login" render={(props) => <Login {...props} props={setIsLogged} /> }/>
    </Switch>
  </Router>
  );
}

export default App;
