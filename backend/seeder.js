import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

// Destroy data
const importData = async () => {
  try {
    // CLear collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Import data
    const createdUsers = await User.insertMany(users); // Array

    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log('Data Imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // CLear collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Dijalankan  ==>  npm run data:import || npm run data:destroy
// Dijalankan saat pertama kali
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
