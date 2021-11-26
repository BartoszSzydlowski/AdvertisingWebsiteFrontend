import React from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about';
//import FetchPhotoFunction from './pages/fetchPhotoFunction';
//import FetchPhotoClass from './pages/fetchPhotoClass';
import UploadPhoto from './pages/advert/addAdvert';

function App() {
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/about" component={About} />
      {/* <Route path="/fetchPhotoFunction" component={FetchPhotoFunction} /> */}
      {/* <Route path="/fetchPhotoClass" component={FetchPhotoClass} /> */}
      <Route path="/uploadPhoto" component={UploadPhoto} />
    </Switch>
  </Router>
  );
}

export default App;
