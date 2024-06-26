import { PrismaClient } from "@prisma/client"
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const prisma = new PrismaClient();

// Setup snap midtrans client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SNAP_SERVER_KEY,
  clientKey: process.env.SNAP_CLIENT_KEY
})

export const createTransaction = async ({ formatDateCheckin, formatDateCheckout, kamarId }, res) => {

  try {
    // Menghitung jumlah hari
    const start = new Date(formatDateCheckin);
    const end = new Date(formatDateCheckout);
    const totalHari = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    console.log({ totalHari })

    // Menghitung harga permalam
    const kamar = await prisma.kamar.findUnique({
      where: {
        id: kamarId
      }
    })

    if (!kamar) return;

    const order_id = uuidv4();
    const grossAmount = kamar.harga * totalHari;

    // Transaksi midtrans dari dokumentasinya
    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: parseInt(grossAmount)
      },
    }

    const transaction = await snap.createTransaction(parameter);
    return { transaction, order_id };
  } catch (error) {
    console.log(error)
  }
}

// export const transactionStatus = async (order_id) => {
//   try {
//     const response = await axios.get(`https://api.sandbox.midtrans.com/v2/transaction/${order_id}/status`, {
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         "Authorization": `Basic ${Buffer.from(process.env.SNAP_SERVER_KEY + ":").toString("base64")}`
//       }
//     })

//     console.log({ response });
//     const statusResponse = response.data;
//     return statusResponse.status;
//   } catch (error) {
//     console.log(error.response.data)
//   }
// }

// export const transactionStatus = async (order_id, res) => {
//   try {
//     const statusResponse = await snap.transaction.status(order_id);
//     const transactionStatus = statusResponse.transaction_status;

//     console.log({ statusResponse, transactionStatus })

//     return transactionStatus;
//   } catch (error) {
//     console.log(error);
//   }
// }