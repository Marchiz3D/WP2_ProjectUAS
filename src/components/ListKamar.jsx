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
    <div className="container">
      <h1 className="text-3xl font-bold p-2">
        List Kamar <i>"Hotel Pallete"</i>
      </h1>
      <div className="container flex flex-wrap gap-3 justify-between my-3">
        {kamars.map((kamar) => {
          return (
            <div key={kamar.id}>
              <Card
                style={{ width: "18rem", height: "28rem" }}
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
                  <Card.Text>
                    Rp. {kamar.harga.toLocaleString("id-ID")}
                  </Card.Text>
                  {kamar.status_kamar ? (
                    <div className="bg-red-500 text-white p-2 rounded-md w-1/2 text-center">
                      Telah dipesan
                    </div>
                  ) : (
                    <Link
                      to={`/kamar/reservasi/${kamar.id}`}
                      className="bg-gray-800 p-2 rounded-md no-underline text-white hover:bg-green-500 transition-all"
                    >
                      Pesan Kamar
                    </Link>
                  )}
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListKamar
