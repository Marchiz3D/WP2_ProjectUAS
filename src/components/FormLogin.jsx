import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navigation from "./Navigation"
import axios from "axios"
import { Image } from "react-bootstrap"

function FormLogin({}) {
  const [email, setEmail] = useState("")
  const [password, setPasswrod] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPasswrod(e.target.value)

  useEffect(() => {
    const handleRouteChange = () => {
      const storeedIsLogin = localStorage.getItem("isLogin")
      if (storeedIsLogin) {
        setIsLogin(JSON.parse(storeedIsLogin))
      }
    }

    window.addEventListener("routeChangeComplete", handleRouteChange)

    return () => {
      window.removeEventListener("routeChangeComplete", handleRouteChange)
    }
  }, [navigate])

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(
        "http://localhost:5000/api/customers/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        setIsLogin(true)
        setTimeout(() => {
          navigate("/kamar")
        }, 1000)
        localStorage.setItem("isLogin", true)
        console.log(response)
      } else {
        setIsLogin(false)
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      setIsLogin(false)
      setErrorMessage(error.response.data?.message)
    }
  }
  return (
    <div>
      <Navigation />
      <div className="container flex justify-center items-center flex-col min-vh-100">
        <form
          method="post"
          onSubmit={handleLogin}
          className="border-2 border-black rounded-md shadow-2xl shadow-zinc-500 bg-zinc-50 text-black flex md:flex-row md:justify-around flex-col justify-center gap-5 p-3"
        >
          <div>
            <Image src="/assets/login.png" style={{ height: "400px" }} />
          </div>
          <div>
            <div className="p-4">
              <h3 className="text-center">Login Customers</h3>
            </div>
            {isLogin && (
              <div
                className="bg-green-200 text-center mx-2 rounded-md border-2 border-green-400 p-1"
                role="alert"
              >
                Berhasil Login
              </div>
            )}
            {!isLogin && errorMessage && (
              <div
                className="bg-red-200 text-center mx-2 rounded-md border-2 border-red-400 p-1"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            <div className="form-label px-2 flex flex-col">
              <label htmlFor="email">Email :</label>
              <input
                type="text"
                name="email"
                id="email"
                className="rounded-md p-1 bg-gray-100 border-2 border-black"
                value={email}
                onChange={handleEmail}
                required
              />
            </div>
            <div className="form-label px-2 flex flex-col">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                id="password"
                className="rounded-md p-1 bg-gray-100 border-2 border-black"
                value={password}
                onChange={handlePassword}
                required
              />
            </div>
            <div className="py-4 flex justify-center items-center gap-3">
              <a
                href="/"
                className="p-1 rounded-md border-2 border-black bg-gray-100 no-underline text-black hover:transition-all hover:bg-gray-400"
              >
                Back to Home
              </a>
              <button
                type="submit"
                className="py-1 px-4 rounded-md border-2 border-black bg-gray-100 hover:transition-all hover:bg-gray-400"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormLogin
