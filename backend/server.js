import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use('/api/products', productRoutes);

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
