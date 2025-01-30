// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token bulunamadı, lütfen giriş yapın.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Kullanıcının ID'sini request objesine ekliyoruz
    next(); // Middleware'ı geçiyoruz
  } catch (error) {
    return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
  }
};

export default authMiddleware;
