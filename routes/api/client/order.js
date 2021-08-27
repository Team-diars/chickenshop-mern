const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Order = require("../../../models/client/Order");
const auth = require('../../../middleware/client/auth');
const { check, validationResult } = require("express-validator");
//* @desc    Create new order
//* @route   POST /api/orders
//* @access  Private
router.post('/',[
  auth
],asyncHandler(async(req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return;
  } else {
    
    const order = new Order({
      orderItems,
      cod_user_client: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
}))

//* @desc    Get order by ID
//* @route   GET /api/orders/:id
//* @access  Private
router.get('/',asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}))

//* @desc    Update order to paid
//* @route   GET /api/orders/:id/pay
//* @access  Private
router.get('/:id/pay',asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}))

//* @desc    Update order to delivered
//* @route   GET /api/orders/:id/deliver
//* @access  Private/Admin
router.get('/:id/deliver',asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}))

//* @desc    Get logged in user orders
//* @route   GET /api/orders/myorders
//* @access  Private
router.get('/myorders',asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
}))

//* @desc    Get all orders
//* @route   GET /api/orders
//* @access  Private/Admin
router.get('/',asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: 1 }).sort({date: 1}).exec();
  return res.json(orders);
}))


module.exports = router;