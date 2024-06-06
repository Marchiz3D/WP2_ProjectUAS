import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addReservasi = async (req, res) => {
  try {
    // mengambil data customers untuk diambil idnya
    const customers = await prisma.customers.findFirst({
      where: {
        refresh_token: req.cookies.refreshToken
      }
    })


    // Menambahkan data reservasi
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

    const reservasi = await prisma.reservasi.create({
      data: {
        id_customers: customers.id,
        id_kamar,
        tanggal_checkin: formatDateCheckin.toString(),
        tanggal_checkout: formatDateCheckout.toString()
      }
    })
    res.status(201).json({ reserved: reservasi })
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan data reservasi', error: error.message });
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

    // Validasi apakah ada data resevasi atau tidak
    if (!reservasi) return res.status(404).json({ messsage: 'Belum ada data reservasi' });

    res.status(200).json(reservasi);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const deleteReservasi = async (req, res) => {
  try {
    // Mengambil data customers
    const customers = await prisma.customers.findFirst({
      where: {
        refresh_token: req.cookies.refreshToken
      }
    })

    // Mencari data reservasi
    const reservasi = await prisma.reservasi.findMany();

    // validasi jika reservasi tidak ada
    if (!reservasi) return res.status(404).json({ message: 'Data reservasi tidak ditemukan' });

    const deletedReservasi = await prisma.reservasi.delete({
      where: {
        id_customers: customers.id
      }
    })

    res.status(200).json({ deleted: deletedReservasi });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}