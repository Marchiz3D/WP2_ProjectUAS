import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Registrasi from "./pages/Registrasi"
import Login from "./pages/Login"
import Kamar from "./pages/Kamar"
import NotFound from "./pages/NotFound"
import Reservasi from "./pages/Reservasi"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kamar" element={<Kamar />} />
        <Route path="/kamar/reservasi/:id" element={<Reservasi />} />
      </Routes>
    </Router>
  )
}

export default App
