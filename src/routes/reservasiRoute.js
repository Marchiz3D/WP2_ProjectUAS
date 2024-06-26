import express from "express";
import { addReservasi, deleteReservasi, getReservasi } from "../controller/reservasiController.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const reservasiRouter = express.Router();

reservasiRouter.post('/addreservasi', verifyAuth, addReservasi);

reservasiRouter.get('/view', verifyAuth, getReservasi);

reservasiRouter.delete('/deletereservasi/:kamarId', verifyAuth, deleteReservasi);

export default reservasiRouter;