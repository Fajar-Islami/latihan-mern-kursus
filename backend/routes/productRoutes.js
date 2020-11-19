import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';

// // @desc    Fetch single products
// // @route   GET /api/products/:id
// // @access  Public
// router.get(
//   '/:id',
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404); // Kalo tidak di set jadi 500
//       throw new Error('Product not found');
//     }
//   }),
// );

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
