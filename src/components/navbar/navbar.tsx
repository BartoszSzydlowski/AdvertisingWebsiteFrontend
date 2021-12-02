import { Nav, NavLogo, NavLink, Bars, NavMenu, LogoutNavLink, } from "./navbarElements";

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