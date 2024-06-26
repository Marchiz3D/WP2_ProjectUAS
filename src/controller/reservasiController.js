import { PrismaClient } from "@prisma/client";
import { createTransaction } from "../utils/transaction.js";

const prisma = new PrismaClient();

export const addReservasi = async (req, res) => {
  try {
    // mengambil data customers untuk diambil idnya
    const customers = await prisma.customers.findFirst({
      where: {
        refresh_token: req.cookies.refreshToken
      }
    })

    if (!customers) return res.status(404).json({ message: 'Customers tidak ditemukan' });

    const { lama_hari, id_kamar } = req.body;
    const tanggalSekarang = new Date(Date.now());
    const tanggalCheckout = new Date(tanggalSekarang);
    tanggalCheckout.setDate(tanggalSekarang.getDate() + lama_hari);


    // Membuat format tanggal dan waktu
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0'); // Tambah karakter '0' di depan jika dibawah 10/hanya ada 1 digit
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    const formatDateCheckin = formatDate(tanggalSekarang);
    const formatDateCheckout = formatDate(tanggalCheckout);

    // Mengambil data kamar apakah ada atau tidak
    const kamar = await prisma.kamar.findUnique({
      where: {
        id: id_kamar
      }
    })

    // Membuat transaksi
    if (!kamar) return res.status(404).json({ message: 'Kamar tidak ditemukan' });

    const { order_id, transaction } = await createTransaction({
      formatDateCheckin: tanggalSekarang,
      formatDateCheckout: tanggalCheckout,
      kamarId: id_kamar
    }, res)

    console.log(transaction)

    if (!transaction) {
      return res.status(500).json({ message: 'Gagal membuat transaksi' });
    }

    // Menambahkan data reservasi
    const reservasi = await prisma.reservasi.create({
      data: {
        id_customers: customers.id,
        id_kamar,
        tanggal_checkin: formatDateCheckin.toString(),
        tanggal_checkout: formatDateCheckout.toString(),
        status_reservasi: 'paid'
      }
    })

    // update status kamar
    await prisma.kamar.update({
      where: {
        id: id_kamar
      },
      data: {
        status_kamar: true
      }
    })

    if (!reservasi) {
      return await prisma.kamar.update({
        where: {
          id: id_kamar
        },
        data: {
          status_kamar: false
        }
      })
    }

    res.status(201).json({ reserved: reservasi, transaction, order_id });

  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan data reservasi', error: error.message });
    console.log(error)
  }
}

export const getReservasi = async (req, res) => {
  try {
    // Mengambil data customers
    const customers = await prisma.customers.findFirst({
      where: {
        refresh_token: req.cookies.refreshToken
      }
    })

    // Mengambil data reservasi
    const id_customers = customers.id
    const reservasi = await prisma.reservasi.findFirst({
      where: {
        id_customers
      }
    })

    // Mengambil data kamar
    const kamar = await prisma.kamar.findFirst({
      where: {
        id: reservasi.id_kamar
      }
    })

    // Validasi apakah ada data resevasi atau tidak
    if (!reservasi) return res.status(404).json({ messsage: 'Belum ada data reservasi' });

    res.status(200).json({ reservasi, no_kamar: kamar.no_kamar, customer: { name: customers.name, email: customers.email } });
  } catch (error) {
    res.status(500).json(error);
  }
}

export const deleteReservasi = async (req, res) => {
  try {
    let { kamarId } = req.params;
    kamarId = parseInt(kamarId);

    const response = await prisma.reservasi.deleteMany({
      where: {
        id_kamar: kamarId
      }
    })

    if (!response) return res.status(404).json({ message: 'Reservasi tidak ditemukan' });

    // update status kamar
    await prisma.kamar.update({
      where: {
        id: kamarId
      },
      data: {
        status_kamar: false
      }
    })

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}