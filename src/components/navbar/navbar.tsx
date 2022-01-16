import React, { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../../App';
import CategoriesNavbar from '../category/categoryNavbar';

interface IBootstrapNavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => () => void;
}

const BootstrapNavbar: React.FC<IBootstrapNavbarProps> = (props) => {
  const userContext = useContext(UserDataContext);

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Advertising website
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <NavDropdown title="Adverts">
              <NavDropdown.Item as={Link} to="/adverts">
                Show all
              </NavDropdown.Item>
              <NavDropdown.Item as ={Link} to="/searchAdverts">
                Search
              </NavDropdown.Item>
              {userContext.userRole !== '' && userContext.userRole !== null && (
                userContext.userRole === 'User' || userContext.userRole === 'Admin' || userContext.userRole === 'Moderator') && (
                  <NavDropdown.Item as={Link} to="/createAdvert">
                    Add new advert
                  </NavDropdown.Item>
              )}
              {userContext.userRole !== '' && userContext.userRole !== null && (
                <NavDropdown.Item as={Link} to="/myAdverts">
                  My adverts
                </NavDropdown.Item>
              )}
            </NavDropdown>
            <NavDropdown title="Show adverts from category">
              <CategoriesNavbar />
            </NavDropdown>
            {userContext.userRole !== '' &&
              userContext.userRole !== null &&
              userContext.userRole === 'Admin' && (
                <NavDropdown title="Administrator panel">
                  <NavDropdown.Item as={Link} to="/showPending">
                    Show pending adverts
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/categories">
                    Categories panel
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/manageAdverts">
                    Manage adverts
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/createAdminMod">
                    Create administrator or moderator account
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            {userContext.userRole !== '' &&
              userContext.userRole !== null &&
              userContext.userRole === 'Moderator' && (
                <NavDropdown title="Moderator panel">
                  <NavDropdown.Item as={Link} to="/showPending">
                    Show pending adverts
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/categories">
                    Categories panel
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/manageAdverts">
                    Manage adverts
                  </NavDropdown.Item>
                </NavDropdown>
            )}
            {!props.isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="ml-auto">
                  Register
                </Nav.Link>
              </>
            ) : (
              <NavDropdown title={`Hi, ${userContext.username}`}>
                <NavDropdown.Item as={Link} to="/manageAccount">
                  Manage account
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" onClick={props.handleLogout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              // <Nav.Link as={Link} to="/" onClick={props.handleLogout()}>
              //   Logout
              // </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BootstrapNavbar;
