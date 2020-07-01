import React, { useState } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import store from '../store/store';
import { useSelector } from 'react-redux';
import logo from '../scroll.png';

export const NavbarComponent = (props) => {
  const [token, setToken] = useState(store.getState().token);

  useSelector((state) => {
    if (token !== state.token) {
      setToken(state.token);
    }
  });

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Brand href="/">
        <Image
          style={{ width: '1.5em', marginRight: '0.5em' }}
          src={logo}
          rounded
        />
        Entertainment Tracker
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {token ? (
            <React.Fragment>
              <Nav.Link href="/">Entries</Nav.Link>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Nav.Link href="/">Login</Nav.Link>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
