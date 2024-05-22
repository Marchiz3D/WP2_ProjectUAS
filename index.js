import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import customersRouter from './src/routes/customersRoute.js';
import kamarRouter from './src/routes/kamarRoute.js';
import reservasiRouter from './src/routes/reservasiRoute.js';

const app = express();
const port = 5000;

// app.use('/api/kamar/view', express.static('public/images'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true, allowedHeaders: true }));

// route untuk mengambil data customers
app.use('/api/customers', customersRouter);
// Route untuk mengambil data kamar
app.use('/api/kamar', kamarRouter);
// Route untuk reservasi
app.use('/api/reservasi', reservasiRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));