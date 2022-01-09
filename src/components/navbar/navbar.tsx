import React, { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoleContext } from '../../App';

const BootstrapNavbar = (props: any) => {
  const userRole = useContext(RoleContext);

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
            <Nav.Link as={Link} to="/adverts">
              Paged adverts
            </Nav.Link>
            {userRole !== '' && userRole !== null && (userRole === 'User' || userRole === 'Admin' || userRole === 'Moderator') && (
              <Nav.Link as={Link} to="/createAdvert">
                Add new advert
              </Nav.Link>
            )}
            {userRole !== '' && userRole !== null && (userRole === 'Admin' || userRole === 'Moderator') && (
              <NavDropdown title="Administrator panel">
                <NavDropdown.Item>Show pending adverts</NavDropdown.Item>
                <NavDropdown.Item>Categories panel</NavDropdown.Item>
                <NavDropdown.Item>3</NavDropdown.Item>
              </NavDropdown>
            )}
            {userRole !== '' && userRole !== null && (
              <Nav.Link as={Link} to="/myAdverts">
                My adverts
              </Nav.Link>
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
              <Nav.Link as={Link} to="/" onClick={props.logout()}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BootstrapNavbar;
