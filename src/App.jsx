import Home from "./pages/Home"
import Registrasi from "./pages/Registrasi"
import Login from "./pages/Login"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Kamar from "./pages/Kamar"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kamar" element={<Kamar />} />
      </Routes>
    </Router>
  )
}

export default App
