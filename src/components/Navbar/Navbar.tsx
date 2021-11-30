import Cookies from "js-cookie";
import React, { useEffect, useState,  } from "react";
import Logout from "../../pages/logout";
import { Nav, NavLogo, NavLink, Bars, NavMenu, } from "./NavbarElements";

const Navbar = ({props}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getToken = Cookies.get('Token')
    getToken ? setIsLoggedIn(true) :  setIsLoggedIn(false)
  }, [props, isLoggedIn])

  return (
    <>
      <Nav>
        <NavLogo to="/">
          Logo
        </NavLogo>

        <Bars />

        <NavMenu>
          <NavLink to="/home">
            Home
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/createAdvert">
            Add new advert
          </NavLink>

          { 
            !isLoggedIn ?
              <>
                <NavLink to="/login">
                  Login
                </NavLink>
              
                <NavLink to="/register">
                  Register
                </NavLink>
              </>
            :
            // <NavLink to="/logout" onClick={() => {
            //   Cookies.remove('Token');
            //   setIsLoggedIn(false);
            //   return history.push('/home');
            // }}>
            //   Logout
            // </NavLink>
            <Logout props={setIsLoggedIn}/>
          }
        </NavMenu> 
      </Nav> 
    </>
  );
};
export default Navbar;