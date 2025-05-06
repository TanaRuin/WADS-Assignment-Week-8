import bcrypt from "bcryptjs";
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

import {User} from '../models/User.js';

// Register a new user
const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ email, password: hashedPassword, name });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout function
const logout = async (req, res) => {
  try {
      res.clearCookie('refreshtoken', { path: '/', httpOnly: true, expires: new Date(0) });
      res.json({ message: "Logged out successfully!" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
export{ register, login, logout };
