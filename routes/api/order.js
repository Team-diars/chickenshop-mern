const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const Order = require('../../models/Order');

// @route  GET api/order
// @des    Get Live Orders
// @access Public
router.get('/', async(req,res) => {
  try {
    const orders = await Order.find({ status: 1 }).sort({date: -1}).exec();
    return res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
})

module.exports = router;