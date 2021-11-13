const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Sale = require("../../models/Sale");
const auth = require("../../middleware/auth");

//* @route  GET api/sale/
//* @desc   Get all sales
//* @access Private
router.get("/", [auth], async (req, res) => {
  try {
    const sales = await Sale.find({ hasPaid: true }).sort({ date: -1 }).exec(); //* Retrieve all tickets that has been paid
    return res.json(sales);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//* @route  POST api/sale/
//* @desc   Generate Sale
//* @access Private
router.post(
  "/",
  [
    auth,
    [
      check("num_table", "Table is required").not().isEmpty(),
      check("num_table", "Table must be a number").not().isString(),
      check("num_table", "Table lenght must be less than 3").isLength({
        max: 2,
      }),
      check(
        "num_table",
        "Table number must be greater than 0 or less than 20"
      ).isInt({ min: 1, max: 20 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(500).json({ errors: errors.array() });
    try {
      const { num_table } = req.body;
      const tableData = await Sale.find({ num_table, status: 1 }).exec();

      if (!tableData) {
        // return res.status(500).json({status: `Table ${num_table} does not exist`});
        return res.status(500).json({
          errors: [
            {
              msg: `Table ${num_table} does not exist`,
            },
          ],
        });
      } else {
        await Sale.findByIdAndUpdate(
          tableData,
          { hasPaid: true, status: 0 },
          { new: true }
        ); //* new:true is for not getting as a response the previous record
        return res.json({ status: "Sale Updated" });
      }
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
