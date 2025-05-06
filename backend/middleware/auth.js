import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id: userId }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
export  {auth};
