const jwt = require('jsonwebtoken');
const UserData = require('../models/User');
const bcrypt = require('bcrypt');
const {JWT_SECRET} = require('../config/env');
const loginController = async (req, res) => {
  const { email, password } = req.body;
console.log(req.body,"Kuch bhi")
  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await UserData.findOne({ email });
console.log(user,"User")
    if (user) {
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // If password is valid, generate JWT token
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          role: user.role,
        },
        JWT_SECRET, // Use the JWT_SECRET from environment variables
        { expiresIn: '6h' },
      );

      res.set('x-auth', token);
      return res.status(200).json({ status: 'ok', user: token, role: user.role });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = loginController;
