import express from 'express';
import session from 'express-session';
import customersRouter from './src/routes/customersRoute.js';
import kamarRouter from './src/routes/kamarRoute.js';
import reservasiRouter from './src/routes/reservasiRoute.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

// route untuk mengambil data customers
app.use('/api/customers', customersRouter);
// Route untuk mengambil data kamar
app.use('/api/kamar', kamarRouter);
// Route untuk reservasi
app.use('/api/reservasi', reservasiRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));