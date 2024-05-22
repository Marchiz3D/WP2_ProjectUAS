import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const refreshToken = async (req, res) => {
  try {
    const cookieRefreshToken = req.cookies.refreshToken; //Mengambil cookie refreshToken
    if (!cookieRefreshToken) return res.status(401).json({ message: "Unauthorized" });

    // Cek apakah ada data customers
    const customers = await prisma.customers.findFirst({
      where: {
        refresh_token: cookieRefreshToken
      }
    })

    if (!customers) return res.status(404).json({ message: "User not found" });

    // Cek apakah token expired
    jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const id_customers = customers.id;
      const email_customers = customers.email;
      // buat token baru
      const accessToken = jwt.sign({ id_customers, email_customers }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      res.status(200).json({ token: accessToken });
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}