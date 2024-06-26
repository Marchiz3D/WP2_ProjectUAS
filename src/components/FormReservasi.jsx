import React, { useState, useEffect } from "react"
import axiosInstance from "../libs/auth/refreshToken"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import useSnap from "../hooks/useSnap"
import { Image } from "react-bootstrap"

const FormReservasi = () => {
  const [dataCustomer, setDataCustomer] = useState({})
  const [lamaHari, setLamaHari] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const { idKamar } = useParams()
  const { embededSnap } = useSnap()
  const navigate = useNavigate()

  useEffect(() => {
    getDataCustomer()
  }, [])

  const getDataCustomer = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/api/customers/customer",
        { withCredentials: true }
      )
      setDataCustomer(response.data.customer)
    } catch (error) {
      alert("Anda harus login terlebih dahulu")
      navigate("/login")
    }
  }

  const handleLamaHariChange = (e) => {
    setLamaHari(e.target.value)
  }

  const handleReservasi = async (e) => {
    try {
      e.preventDefault()
      const response = await axiosInstance.post(
        "http://localhost:5000/api/reservasi/addreservasi",
        {
          id_kamar: parseInt(idKamar),
          lama_hari: parseInt(lamaHari),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.request.status !== 201) {
        alert("Gagal")
        return
      }

      console.log(response)

      if (response && response.status === 201) {
        setShowPopup(true)
        embededSnap(response.data?.transaction.token, "snap-container", {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            console.log("TESTING")
            navigate(`/dashboard/${dataCustomer.id}`)
            setShowPopup(false)
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert("wating your payment!")
            console.log(result)
            setShowPopup(false)
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert("payment failed!")
            console.log(result)
            setShowPopup(false)
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment")
          },
        })
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-col min-vh-100">
        {!showPopup && (
          <form
            method="post"
            className="border-2 border-black rounded-md shadow-2xl shadow-zinc-500 bg-zinc-50 text-black flex md:flex-row md:justify-around flex-col justify-center gap-5 p-3"
            onSubmit={handleReservasi}
          >
            <div>
              <Image src="/assets/reservasi.png" style={{ height: "400px" }} />
            </div>
            <div>
              <div className="p-4 text-center">
                <h3>Data Reservasi</h3>
              </div>
              <div className="form-label px-2 flex flex-col">
                <label htmlFor="email">Nama :</label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="rounded-md p-1 bg-gray-100 border-2 border-black"
                  value={dataCustomer.name}
                  readOnly
                />
              </div>
              <div className="form-label px-2 flex flex-col">
                <label htmlFor="email">Email :</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="rounded-md p-1 bg-gray-100 border-2 border-black"
                  value={dataCustomer.email}
                  readOnly
                />
              </div>
              <div className="form-label px-2 flex flex-col">
                <label htmlFor="nohp">Nomor Telepon :</label>
                <input
                  type="text"
                  name="nohp"
                  id="nohp"
                  className="rounded-md p-1 bg-gray-100 border-2 border-black"
                  value={dataCustomer.nomor_telepon}
                  readOnly
                />
              </div>
              <div className="form-label px-2 flex flex-col">
                <label htmlFor="lama_hari">Lama Waktu :</label>
                <input
                  type="text"
                  name="lama_hari"
                  id="lama_hari"
                  value={lamaHari}
                  onChange={handleLamaHariChange}
                  className="rounded-md p-1 bg-gray-100 border-2 border-black"
                  required
                />
              </div>
              <div className="form-label px-2 flex flex-col">
                <input
                  type="text"
                  name="id_kamar"
                  id="id_kamar"
                  value={idKamar}
                  className="rounded-md p-1 bg-gray-100 border-2 border-black"
                  readOnly
                  hidden
                />
              </div>
              <div className="py-4 flex justify-center items-center gap-3">
                <a
                  href="/kamar"
                  className="p-1 rounded-md border-2 border-black bg-gray-100 no-underline text-black hover:transition-all hover:bg-gray-400"
                >
                  Back to Kamar
                </a>
                <button
                  type="submit"
                  className="py-1 px-4 rounded-md border-2 border-black bg-gray-100 hover:transition-all hover:bg-gray-400"
                >
                  Reservasi
                </button>
              </div>
            </div>
          </form>
        )}
        <div id="snap-container"></div>
      </div>
    </div>
  )
}

export default FormReservasi
