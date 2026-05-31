const {User, userValidationSchema} = require('../models/user.service');

const GET = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const GETBYID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }   
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const POST = async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const PUT = async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser && existUser._id != req.params.id) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { GET, GETBYID, POST, PUT };