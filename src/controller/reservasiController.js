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
    const reservasi = await prisma.reservasi.create({
      data: {
        id_customers: customers.id,
        id_kamar,
        tanggal_checkin: tanggalSekarang,
        tanggal_checkout: tanggalCheckout
      }
    })

    res.status(201).json({ reserved: reservasi })
  } catch (error) {
    res.status(500).json({ messsage: 'Kamar telah dipesan' });
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
    if (!reservasi) return res.status(404).json({ messsage: 'Data reservasi tidak ditemukan' });

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