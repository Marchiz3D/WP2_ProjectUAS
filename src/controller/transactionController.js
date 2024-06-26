import { transactionStatus } from "../utils/transaction.js";

// Mengecek status transaksi 
export const checkTransaction = async (req, res) => {
  try {
    const { order_id } = req.params;
    const status = await transactionStatus(order_id);

    if (status) {
      res.status(200).json({ status });
    } else {
      res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengecek status transaksi', error: error.message });
  }
}