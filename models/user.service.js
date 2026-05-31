const joi = require('joi');
const mongoose = require('mongoose');

const userValidationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
    
  }
});

const User = mongoose.model('User', userSchema);


module.exports = { User, userValidationSchema };