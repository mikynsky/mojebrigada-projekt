import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {

  const Background = {
    background: "rgb(131,58,180)",
    background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
  }
  
    return <Navbar style={Background} expand="md" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand>mojeBrigáda - Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/domu">Domů</Nav.Link>
          <Nav.Link href="/smeny">Směny</Nav.Link>
          <Nav.Link href="/brigadnici">Brigádníci</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  }
  
  export default NavBar;