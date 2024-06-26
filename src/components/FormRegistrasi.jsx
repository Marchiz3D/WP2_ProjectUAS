import axios from "axios"
import React, { useState } from "react"
import { Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function FormRegistrasi() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPasswrod] = useState("")
  const [phone_number, setPhone_number] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [validateError, setValidateError] = useState([])
  const navigate = useNavigate()

  const handleName = (e) => setName(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPasswrod(e.target.value)
  const handlePhone_number = (e) => setPhone_number(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Mengirimkan data ke backend
    const data = {
      name,
      email,
      password,
      phone_number,
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers/signup",
        data
      )
      console.log(response)
      if (response) {
        setIsRegistered(true)
        setTimeout(() => {
          navigate("/login")
        }, 1000)
        setValidateError([])
      } else {
        setIsRegistered(false)
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      setIsRegistered(false)
      setErrorMessage(error.response.data.message)
      setValidateError(error.response.data.errors.map((e) => e.msg))
      console.log(validateError)
    }
  }

  return (
    <div className="flex justify-center items-center flex-col min-vh-100">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="border-2 border-black rounded-md shadow-2xl shadow-zinc-500 bg-zinc-50 text-black flex md:flex-row md:justify-around flex-col justify-center gap-5 p-3"
      >
        <div>
          <Image src="/assets/registrasi.png" style={{ height: "400px" }} />
        </div>
        <div>
          <div className="p-4">
            <h3>Registrasi Customers</h3>
          </div>
          {isRegistered && (
            <div
              className="bg-green-200 text-center mx-2 rounded-md border-2 border-green-400 p-1"
              role="alert"
            >
              Register Berhasil
            </div>
          )}
          {!isRegistered && errorMessage && (
            <div
              className="bg-red-200 text-center mx-2 rounded-md border-2 border-red-400 p-1"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
          {validateError && validateError.length > 0 && (
            <div
              className="bg-red-200 text-center mx-2 rounded-md border-2 border-red-400 p-1"
              role="alert"
            >
              {validateError.map((e) => (
                <li className="text-left">{e}</li>
              ))}
            </div>
          )}
          <div className="form-label px-2 flex flex-col">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleName}
              className="rounded-md p-1 bg-gray-100 border-2 border-black"
              required
            />
          </div>
          <div className="form-label px-2 flex flex-col">
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleEmail}
              className="rounded-md p-1 bg-gray-100 border-2 border-black"
              required
            />
          </div>
          <div className="form-label px-2 flex flex-col">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePassword}
              className="rounded-md p-1 bg-gray-100 border-2 border-black"
              required
            />
          </div>
          <div className="form-label px-2 flex flex-col">
            <label htmlFor="phone">Phone Number :</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone_number}
              onChange={handlePhone_number}
              className="rounded-md p-1 bg-gray-100 border-2 border-black"
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
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormRegistrasi
