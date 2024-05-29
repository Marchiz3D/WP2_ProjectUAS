import React, { useEffect, useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Navigation = ({ isLogin }) => {
  const [showNavigation, setShowNavigation] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storeedIsLogin = localStorage.getItem("isLogin")
    if (storeedIsLogin) {
      setShowNavigation(JSON.parse(storeedIsLogin))
    }
  }, [])
  // Membuat fitur untuk handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/customers/logout",
        { withCredentials: true }
      )
      console.log(response)
      setShowNavigation(true)
      localStorage.removeItem("isLogin")
      alert("Logout Success")
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar expand="lg" className="p-3 bg-zinc-50 sticky-top">
      <Navbar.Brand href="/">Hotel Ashiap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Burger Icon */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href="/kamar">Kamar</Nav.Link>
          {showNavigation ? (
            <Nav.Link
              className="lg:absolute lg:right-0 relative mr-2"
              onClick={handleLogout}
            >
              Logout
            </Nav.Link>
          ) : (
            <div className="lg:absolute lg:right-0 lg:flex lg:flex-row lg:pr-2 relative right-0 flex flex-col">
              <Nav.Link href="/registrasi">Sign Up</Nav.Link>
              <Nav.Link href="/login">Sign In</Nav.Link>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
