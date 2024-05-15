import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getAllCustomers = async (req, res) => {
  try {
    // Mengambil semua data customers
    const customers = await prisma.customers.findMany();

    // Validasi jika tidak ada customers
    if (!customers) return res.status(404).json({ message: 'Belum ada Customers' });
    res.status(200).json({ customers: customers });
  } catch (error) {
    res.status(505).json({ message: error });
  }
}

export const addCustomers = async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;
    // Mengambil data customers berdasarkan email
    const customers = await prisma.customers.findUnique({
      where: {
        email
      }
    });

    // Validasi apakah customers sudah terdaftar
    if (customers) return res.status(403).json({ message: 'User telah terdaftar' });

    // Enkripsi password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Membuat data customers
    const newCustomers = await prisma.customers.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number
      }
    })

    res.status(201).json({ customers: newCustomers });
  } catch (error) {
    res.status(505).json({ message: error })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Mengambil data customers berdasarkan email
    const customers = await prisma.customers.findUnique({
      where: {
        email
      }
    });

    // Validasi apakah customers sudah terdaftar
    if (!customers) return res.status(403).json({ message: 'User belum terdaftar' });

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, customers.password);

    if (!isPasswordCorrect) return res.status(403).json({ message: 'Password tidak cocok' })

    // Simpan data login ke session
    req.session.customersId = customers.id;
    res.status(200).json({ message: 'Berhasil Login' });

  } catch (error) {
    res.status(505).json({ message: error });
  }
}

export const logout = async (req, res) => {
  try {
    if (!req.session.customersId) {
      return res.status(403).json({ message: 'Anda belum login' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'Terjadi kesalahan saat logout' });
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Berhasil Logout' });
    });
  } catch (error) {
    console.log(error)
    res.status(505).json({ message: error });
  }
}