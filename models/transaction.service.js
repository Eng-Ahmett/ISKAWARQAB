const mongoose = require("mongoose");
const Joi = require("joi");
const transectionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const TransectionModel = mongoose.model("Transections", transectionSchema);
function validateTransection(transection) {
  const schema = Joi.object({
    amount: Joi.number().required(),
    categoryId: Joi.string().required(),
    userId: Joi.string().required(),
  });
  return schema.validate(transection);
}

module.exports = {
  TransectionModel,
  transectionSchema,
  validateTransection,
};