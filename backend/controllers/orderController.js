import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Creat new order
// @route   POST /api/orders
// @access  Privete
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  // console.log(req.user);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id, // melewati middleware protect dlu
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );
  // console.log('order:', order);
  // populate untuk cari email dan name pada user
  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error('Not Found');
  }
});

export { addOrderItems, getOrderById };
