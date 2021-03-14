const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Order = require("../../../models/client/Order");

//* @desc    Create new order
//* @route   POST /api/orders
//* @access  Private
router.post('/',asyncHandler(async(req, res) => {
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

module.exports = router;