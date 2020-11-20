import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// accept json data in body

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
);

// di esmodule gk bisa mke __dirname, maka buat const berikut
const __dirname = path.resolve();

// Static folder in express, agar bisa diakses
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 404 Error routes
app.use(notFound);
// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Kalau tidak ketemu jadi port 5000

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold,
  ),
);
