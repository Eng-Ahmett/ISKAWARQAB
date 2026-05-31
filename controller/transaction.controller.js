
const {
  validateTransection,
  TransectionModel,
} = require("../models/transaction.service");

const Get = async (req, res) => {
  try {
    const transections = await TransectionModel.find();
    res.json({
      status: true,
      message: "Transections retrieved successfully",
      data: transections,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const Post = async (req, res) => {
  try {
    const { error } = validateTransection(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    const newTransection = new TransectionModel({
      amount: req.body.amount,
      categoryId: req.body.categoryId,
      userId: req.body.userId,
    });
    await newTransection.save();
    res.status(201).json({
      status: true,
      message: "Transection created successfully",
      data: newTransection,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const Put = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTransection = await TransectionModel.findByIdAndUpdate(
      id,
      {
        amount: req.body.amount,
        categoryId: req.body.categoryId,
        userId: req.body.userId,
      },
      { new: true },
    );
    res.json({
      status: true,
      message: "Transection updated successfully",
      data: updatedTransection,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  Get,
  Post,
  Put,
};