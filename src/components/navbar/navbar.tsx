import Cookies from "js-cookie";
import React, { useEffect, useState, } from "react";
import { Nav, NavLogo, NavLink, Bars, NavMenu, } from "./navbarElements";

const Navbar = (props: any) => {
    return (
        <>
            <Nav>
                <NavLogo to="/">
                    Logo
                </NavLogo>

                <Bars/>

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

                    {!props.isLoggedIn ? (
                        <>
                            <NavLink to="/login">
                                Login
                            </NavLink>

                            <NavLink to="/register">
                                Register
                            </NavLink>
                        </>
                        ) : (
                        <NavLink to="/logout" onClick={props.logout()}>
                            Logout
                        </NavLink>
                    )}
                </NavMenu>
            </Nav>
        </>
    );
};
export default Navbar;