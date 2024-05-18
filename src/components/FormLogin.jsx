import React, { useState } from "react"

function FormLogin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lakukan sesuatu dengan data formulir, seperti mengirimkannya ke backend atau melakukan validasi
    console.log(formData)
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default FormLogin
