import express from "express";
import { checkTransaction } from "../controller/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.get('/checktransaction/:order_id', checkTransaction);

export default transactionRouter;