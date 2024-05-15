import express from "express";
import { addCustomers, getAllCustomers, login, logout } from "../controller/customersContoller.js";

const customersRouter = express.Router();

customersRouter.get('/', getAllCustomers);

customersRouter.post('/signup', addCustomers);

customersRouter.post('/login', login);

customersRouter.delete('/logout', logout);

export default customersRouter;