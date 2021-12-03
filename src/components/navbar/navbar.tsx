import React from 'react';
import { Nav, NavLogo, NavLink, Bars, NavMenu, LogoutNavLink } from './navbarElements';

const Navbar = (props: any) => {
    return (
        <>
            <Nav>
                <NavLogo to="/">
                    
                </NavLogo>

                <Bars/>

                <NavMenu>
                    <NavLink exact to="/">
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
                        <LogoutNavLink to="/home" onClick={props.logout()}>
                            Logout
                        </LogoutNavLink>
                    )}
                </NavMenu>
            </Nav>
        </>
    );
};
export default Navbar;