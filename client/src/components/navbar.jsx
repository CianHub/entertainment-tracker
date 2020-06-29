import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import store from '../store/store';
import { useSelector } from 'react-redux';

export const NavbarComponent = (props) => {
  const [token, setToken] = useState(store.getState().token);

  useSelector((state) => {
    if (token !== state.token) {
      setToken(state.token);
    }
  });

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Entertainment Tracker</Navbar.Brand>
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
