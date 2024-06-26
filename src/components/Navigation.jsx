import React, { useEffect, useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import axios from "axios"
import axiosInstance from "../libs/auth/refreshToken"
import { useNavigate } from "react-router-dom"

const Navigation = () => {
  const [showNavigation, setShowNavigation] = useState(false)
  let [customerId, setCustomerId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const storeedIsLogin = localStorage.getItem("isLogin")
    if (storeedIsLogin) {
      setShowNavigation(JSON.parse(storeedIsLogin))
    }
    getCustomer()
  }, [])

  const getCustomer = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/api/customers/customer",
        { withCredentials: true },
        { Headers: { "Content-Type": "application/json" } }
      )
      setCustomerId(response.data.customer.id)
      setCustomerName(response.data.customer.name)
    } catch (error) {
      console.log(error)
    }
  }

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
      {customerName ? (
        <div>
          <Navbar.Brand href="/">Hotel Pallete</Navbar.Brand>
          <Navbar.Brand>{customerName}</Navbar.Brand>
          <Navbar.Brand href={`/dashboard/${customerId}`}>
            My Booking
          </Navbar.Brand>
        </div>
      ) : (
        <Navbar.Brand href="/">Hotel Pallete</Navbar.Brand>
      )}
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
