import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // res.status(401); // not authorized
  // throw new Error('Not Authorized');
  res.json(products);
});

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404); // Kalo tidak di set jadi 500
    throw new Error('Product not found');
  }
});

export { getProductById, getProducts };