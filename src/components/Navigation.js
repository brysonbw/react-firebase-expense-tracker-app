import React from 'react'
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';


function Navigation() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

    return (
        <header>
             <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
  <Container className="mb-3 mt-3">
  <Navbar.Brand as={Link} to='/'>MyExpenses</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    {/* <Nav.Link eventKey={1} as={Link} to='/'>Home</Nav.Link> */}
    {!user && (
      <>
       <Nav.Link eventKey={2} as={Link} to='/login'>Login</Nav.Link>
       <Nav.Link eventKey={3} as={Link} to='/signup'>Sign Up</Nav.Link>
       </>
    )}
    </Nav>
    {user && (
      <>
      <Nav className="user-display"> hello, {user.displayName}</Nav>
      <Button eventkey={4} variant="outline-light" size="md" onClick={logout}>Logout</Button>
      </>
    )}
  </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Navigation
