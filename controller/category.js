const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: 1 }).exec();
    return res.json(categories);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const checkifexists = await Category.exists({ _id: id, status: 1 });
    if (!checkifexists) {
      res.status(500).send("Category not found");
    }
    const category = await Category.findById(id);
    return res.json(category);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const registerCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const checkifexists = await Category.exists({ name: name, status: 0 });
    if (checkifexists) {
      await Category.findOneAndUpdate({ name }, { name, status: 1 });
      return res.json({
        status: "OK",
      });
    }
    const newCategory = new Category({ name });
    await newCategory.save();
    return res.json({
      status: "OK",
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const checkifexists = await Category.exists({ _id: id, status: 1 });
    if (!checkifexists) {
      return res.status(500).send("Category not found");
    }
    await Category.findByIdAndUpdate(id, { name }, { new: true });
    return res.json({
      status: "OK",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const checkifexists = await Category.exists({ _id: id, status: 1 });
    if (!checkifexists) {
      return res.status(500).send("Category not found");
    }
    await Category.findByIdAndUpdate(id, { status: 0 }, { new: true });
    return res.json({
      status: "OK",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

module.exports = {
  getCategories,
  getCategory,
  registerCategory,
  updateCategory,
  deleteCategory,
};