import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../libs/auth/refreshToken"

const ListKamar = () => {
  const [kamars, setKamars] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchKamar = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:5000/api/kamar/view"
        )
        setKamars(response.data)
      } catch (error) {
        console.log(error)
        alert("Anda belum login ,Silahkan login")
        navigate("/login")
      }
    }
    fetchKamar()
  }, [])

  return (
    <div className="container flex flex-wrap gap-3 justify-between items-center my-3">
      {kamars.map((kamar) => {
        return (
          <div key={kamar.id}>
            <Card
              style={{ width: "18rem" }}
              className="min-w-full bg-zinc-50 shadow-2xl shadow-zinc-700"
            >
              <Card.Img
                variant="top"
                src={`http://localhost:5000/api/kamar/view/${kamar.gambar_kamar}`}
                style={({ width: "300px" }, { height: "250px" })}
                className="bg-cover"
                alt="Gambar"
              />
              <Card.Body>
                <Card.Title>{kamar.no_kamar}</Card.Title>
                <Card.Text>{kamar.description}</Card.Text>
                <Card.Text>Rp. {kamar.harga.toLocaleString("id-ID")}</Card.Text>
                <Link to={`/kamar/reservasi/${kamar.id}`}>Pesan Kamar</Link>
              </Card.Body>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default ListKamar
