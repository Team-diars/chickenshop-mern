const Product = require("../models/Product");
const Category = require("../models/Category");

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, price } = req.body;
    const categoryExists = await Category.exists({ _id: category, status: 1 });
    if (!categoryExists) {
      return res.status(500).send("Category doesn't exist");
    }
    const exists = await Product.exists({ _id: id, status: 1 });
    if (!exists) {
      return res.status(500).send("Product doesn't exist");
    }
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      { category, name, price },
      {
        new: true,
      }
    );
    return res.json({
      status: "Product updated",
      newproduct: productUpdated,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).send("Product duplicated");
    }
    return res.status(500).send("Server error");
  }
};

module.exports = {
  editProduct,
};
