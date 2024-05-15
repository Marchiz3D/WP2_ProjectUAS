import express from 'express';
import session from 'express-session';
import customersRouter from './src/routes/customersRoute.js';

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

app.listen(port, () => console.log(`Server is running on port: ${port}`));