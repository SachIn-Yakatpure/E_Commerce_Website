import jwt from 'jsonwebtoken';
import Users from '../models/users.js';

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Incoming Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn("No token provided or incorrect format");
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, 'secret_ecom');
    console.log("Decoded Token:", decoded);

    const user = await Users.findById(decoded.user.id).select('-password');
    console.log("User Found in DB:", user);

    if (!user) {
      console.warn("User not found in database");
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default isAuth;
