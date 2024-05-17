import React from "react"

import { Navbar, Nav } from "react-bootstrap"

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="p-3">
      <Navbar.Brand href="#home">Hotel Ashiap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Burger Icon */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="/kamar">Kamar</Nav.Link>
          <Nav.Link href="/registrasi">Sign Up</Nav.Link>
          <Nav.Link href="/login">Sign In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
