import React, { useEffect, useState } from "react"
import Navigation from "../components/Navigation"
import axiosInstance from "../libs/auth/refreshToken"
import { Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [customer, setCustomer] = useState({ name: "", email: "" })
  const [kamarInfo, setKamarInfo] = useState({ noKamar: "", idKamar: "" })
  const [reservasiInfo, setReservasiInfo] = useState({
    tanggal_checkin: "",
    tanggal_checkout: "",
  })
  const [dataReservasi, setDataReservasi] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getDataReservasi()
  }, [])

  // Get data reservasi by customer
  const getDataReservasi = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/api/reservasi/view",
        { withCredentials: true },
        { Headers: { "Content-Type": "application/json" } }
      )

      if (!response) setDataReservasi(false)

      setCustomer({
        name: response.data.customer.name,
        email: response.data.customer.email,
      })
      setKamarInfo({
        noKamar: response.data.no_kamar,
        idKamar: response.data.reservasi.id_kamar,
      })
      setReservasiInfo({
        tanggal_checkin: response.data.reservasi.tanggal_checkin,
        tanggal_checkout: response.data.reservasi.tanggal_checkout,
      })

      setDataReservasi(true)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteReservasi = async (e) => {
    try {
      e.preventDefault()
      const response = await axiosInstance.delete(
        `http://localhost:5000/api/reservasi/deletereservasi/${kamarInfo.idKamar}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!response) return
      alert("Berhasil Checkout")
      navigate(`/`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navigation />
      {!dataReservasi ? (
        <div className="container text-center flex flex-col items-center justify-center h-screen">
          <Image src="/assets/sorry.gif" style={{ width: "100px" }} />
          <h1>Belum ada data reservasi</h1>
          <a
            href="/kamar"
            className="p-1 rounded-md border-2 border-black bg-gray-100 no-underline text-black hover:transition-all hover:bg-gray-400"
          >
            Lihat Kamar
          </a>
        </div>
      ) : (
        <div className="container p-5">
          <form
            method="post"
            onSubmit={deleteReservasi}
            className="border-2 border-black rounded-md shadow-2xl shadow-zinc-500 bg-zinc-50 text-black p-2"
          >
            <h3 className="p-2 text-center">Data Reservasi</h3>
            <div className="form-label px-2 flex flex-col">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                name="name"
                id="name"
                className="rounded-md p-1 bg-gray-100 border-2 border-black"
                readOnly
                value={customer.name}
              />
            </div>
            <div className="form-label px-2 flex flex-col">
              <label htmlFor="email">Email :</label>
              <input
                type="text"
                name="email"
                id="email"
                value={customer.email}
                className="rounded-md p-1 bg-gray-100 border-2 border-black"
                readOnly
              />
            </div>
            <div className="form-label px-2 flex flex-col">
              <label htmlFor="nokamar">Nomor Kamar :</label>
              <input
                type="text"
                name="nokamar"
                id="nokamar"
                value={kamarInfo.noKamar}
                className="rounded-md p-1 bg-gray-100 border-2 border-black"
                readOnly
              />
            </div>
            <div className="form-label px-2 flex flex-col">
              <label htmlFor="checkin">Tanggal Checkin :</label>
              <input
                type="text"
                name="checkin"
                id="checkin"
                value={reservasiInfo.tanggal_checkin}
                className="rounded-md p-1 bg-gray-100 border-2 border-black"
                readOnly
              />
            </div>
            <div className="form-label px-2 flex flex-col">
              <label htmlFor="checkout">Tanggal Checkout :</label>
              <input
                type="text"
                name="checkout"
                id="checkout"
                value={reservasiInfo.tanggal_checkout}
                className="rounded-md p-1 bg-gray-100 border-2 border-black"
                readOnly
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
                className="p-1 rounded-md border-2 border-black bg-gray-100 no-underline text-black hover:transition-all hover:bg-gray-400"
              >
                Checkout
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Dashboard
