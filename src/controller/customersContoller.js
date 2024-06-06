import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const getCustomer = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    const customer = await prisma.customers.findFirst({
      where: {
        refresh_token: refreshToken
      }
    })

    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(customer)
  } catch (error) {
    res.status(505).json({ message: error });
  }
}
export const addCustomers = async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;
    console.log(name, email, password, phone_number);
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
        phone_number,
        refresh_token: null
      }
    })

    res.status(201).json({ customers: newCustomers });
  } catch (error) {
    res.status(505).json({ message: error })
    console.log(error);
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

    // Membuat jwt
    const id_customers = customers.id;
    const email_customers = customers.email;

    const token = jwt.sign({ id_customers, email_customers }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    const refreshToken = jwt.sign({ id_customers, email_customers }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    // update refreshtoken ke database
    await prisma.customers.update({
      where: {
        id: id_customers
      }, data: {
        refresh_token: refreshToken
      }
    })

    // Menambahkan cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({ message: 'Berhasil Login', token: token });
  } catch (error) {
    res.status(505).json({ message: error });
    console.log(error);
  }
}

export const logout = async (req, res) => {
  try {
    const cookieRefreshToken = req.cookies.refreshToken;
    if (!cookieRefreshToken) return res.status(401).json({ message: "Unauthorized" });

    // Cek apakah ada data customers
    const customers = await prisma.customers.findFirst({
      where: {
        refresh_token: cookieRefreshToken
      }
    })

    if (!customers.refresh_token) return res.status(404).json({ message: "User not found" });

    // hapus cookie
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout success' });
  } catch (error) {
    console.log(error)
    res.status(505).json({ message: error });
  }
}