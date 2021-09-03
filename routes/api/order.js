const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const Order = require('../../models/Order');
const auth = require('../../middleware/auth');

// @route  GET api/order
// @des    Get Live Orders
// @access Private
router.get('/',[auth], async(req,res) => {
  try {
    const orders = await Order.find({ status: 1 }).exec();
    return res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
})

// @route  GET api/order/last
// @des    Get Last Inserted
// @access Private
router.get('/first', async(req,res) => {
  try {
    const orders = await Order.find({ status: 1 }).exec();
    return res.json(orders[0]);
  } catch (error) {
    res.status(500).send("Server error");
  }
})

// @route  GET api/order/last
// @des    Remove First Order
// @access Private
router.delete('/first', async(req,res) => {
  try {
    const orders = await Order.find({ status: 1 }).exec();
    if (!orders) return res.status(500).send("No orders left");
    await Order.findByIdAndUpdate(orders[0], { status: 0 }, { new: true });
    return res.json(orders[0]);
  } catch (error) {
    res.status(500).send("Server error");
  }
})

module.exports = router;