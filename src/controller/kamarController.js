import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllKamar = async (req, res) => {
  try {
    // Validasi apakah data kamar ada atau tidak
    const kamar = await prisma.kamar.findMany();
    if (!kamar) return res.status(404).json({ message: 'Data kamar belum tersedia' });

    res.status(200).json(kamar);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const addKamar = async (req, res) => {
  console.log(req.file);
  try {
    const { no_kamar, description, jumlah_kasur, harga } = req.body;

    const tambahKamar = await prisma.kamar.create({
      data: {
        no_kamar,
        description,
        jumlah_kasur: parseInt(jumlah_kasur),
        harga: parseInt(harga),
        gambar_kamar: req.file?.filename
      }
    })
    res.status(201).json({ message: tambahKamar });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export const updateKamar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { no_kamar, description, jumlah_kasur, harga } = req.body;
    // cek apakah ada kamar
    const kamar = await prisma.kamar.findMany({
      where: {
        id
      }
    })

    if (!kamar) return res.status(404).json({ message: 'Kamar tidak ditemukan' });

    const newKamar = await prisma.kamar.update({
      where: {
        id
      },
      data: {
        no_kamar,
        description,
        jumlah_kasur,
        harga
      }
    })

    res.status(200).json({ updated: newKamar })
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}

export const deleteKamar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Validasi apakah kamar ada
    const kamar = await prisma.kamar.findMany({
      where: {
        id
      }
    })

    if (!kamar) return res.status(404).json({ message: 'Kamar tidak ditemukan' });

    const deletedKamar = await prisma.kamar.delete({
      where: {
        id
      }
    })

    res.status(200).json({ deleted: deletedKamar });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}