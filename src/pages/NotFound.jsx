import React from "react"
import Navigation from "../components/Navigation"
import { Image } from "react-bootstrap"
const NotFound = () => {
  return (
    <>
      <Navigation />
      <div className="container text-center flex flex-col items-center justify-center h-screen">
        <Image src="/assets/notfound.gif" style={{ width: "100px" }} />
        <h1 className="display-1">404</h1>
        <p className="lead">Page Not Found</p>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>
    </>
  )
}

export default NotFound
