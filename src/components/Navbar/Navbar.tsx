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

          <NavLink to="/fetchPhotoFunction">
            Fetch photos (function)
          </NavLink>

          <NavLink to="/fetchPhotoClass">
            Fetch photos (class)
          </NavLink>

          <NavLink to="/uploadPhoto">
            Upload photo
          </NavLink>

        </NavMenu> 
      </Nav> 
    </>
  );
};
export default Navbar;