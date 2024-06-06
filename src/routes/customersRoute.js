import express from "express";
import { addCustomers, getAllCustomers, getCustomer, login, logout } from "../controller/customersContoller.js";
import { refreshToken } from "../controller/refreshTokenController.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const customersRouter = express.Router();

customersRouter.get('/', getAllCustomers);

customersRouter.get('/customer', getCustomer);

customersRouter.post('/signup', addCustomers);

customersRouter.get('/token', refreshToken);

customersRouter.post('/login', login);

customersRouter.delete('/logout', logout);

export default customersRouter;