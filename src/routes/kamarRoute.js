import express from "express";
import { addKamar, deleteKamar, getAllKamar, updateKamar } from "../controller/kamarController.js";
import upload from "../middleware/multer.js";

const kamarRouter = express.Router();

kamarRouter.get('/view', getAllKamar);

kamarRouter.post('/addkamar',
  upload.single('gambar_kamar', (req, res) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Gagal menambahkan gambar" });
    } else if (err) {
      return res.status(500).json({ message: err })
    }
  }), addKamar);

kamarRouter.put('/updatekamar/:id', updateKamar);

kamarRouter.delete('/deletekamar/:id', deleteKamar);

export default kamarRouter;