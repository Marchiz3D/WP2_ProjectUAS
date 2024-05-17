import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import { addKamar, deleteKamar, getAllKamar, updateKamar } from "../controller/kamarController.js";

const kamarRouter = express.Router();

kamarRouter.get('/view', verifyAuth, getAllKamar);

kamarRouter.post('/addkamar', addKamar);

kamarRouter.put('/updatekamar/:id', updateKamar);

kamarRouter.delete('/deletekamar/:id', deleteKamar);

export default kamarRouter;