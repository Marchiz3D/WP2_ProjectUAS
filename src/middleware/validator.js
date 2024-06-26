import { body } from "express-validator";

// Membuat validasi untuk data customer
export const customerValidator = [
  body("name").notEmpty().withMessage("Nama tidak boleh kosong!"),
  body("email").isEmail().normalizeEmail().withMessage("Email tidak valid!"),
  body("password").notEmpty().isLength({ min: 6, max: 20 }).withMessage("Password harus 6-20 karakter!"),
  body("phone_number").notEmpty().isMobilePhone(["id-ID"]).withMessage("Nomor telepon tidak valid!"),
]