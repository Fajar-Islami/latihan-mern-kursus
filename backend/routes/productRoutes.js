import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';
const router = express.Router();

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

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
