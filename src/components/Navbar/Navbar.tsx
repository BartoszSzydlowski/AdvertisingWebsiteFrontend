import { Nav, NavLogo, NavLink, Bars, NavMenu, } from "./NavbarElements";

const Navbar = () => {
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

          <NavLink to="/login">
            Login
          </NavLink>

        </NavMenu> 
      </Nav> 
    </>
  );
};
export default Navbar;