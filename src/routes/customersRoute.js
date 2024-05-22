import express from "express";
import { addCustomers, getAllCustomers, login, logout } from "../controller/customersContoller.js";
import { refreshToken } from "../controller/refreshTokenController.js";
import { verifyAuth } from '../middleware/verifyAuth.js';

const customersRouter = express.Router();

customersRouter.get('/', getAllCustomers);

customersRouter.post('/signup', addCustomers);

customersRouter.post('/token', refreshToken);

customersRouter.post('/login', login);

customersRouter.delete('/logout', logout);

export default customersRouter;