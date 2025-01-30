// router.js

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from './middleware/authMiddleware.js'; // Auth Middleware'ı import ettik

const router = express.Router();

// 📌 Kullanıcı Kaydı
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, country, city, photo } = req.body;

    if (password.length < 8 || !/\d/.test(password) || !/\W/.test(password)) {
      return res.status(400).json({ message: 'Şifre en az 8 karakter, 1 rakam ve 1 özel karakter içermeli.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, country, city, photo });

    await newUser.save();
    res.status(201).json({ message: 'Kayıt başarılı!' });

  } catch (error) {
    res.status(500).json({ message: 'Kayıt sırasında hata oluştu.', error });
  }
});

// 📌 Kullanıcı Girişi
router.post('/login',authMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Yanlış şifre.' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Giriş başarılı!', token, user });

  } catch (error) {
    res.status(500).json({ message: 'Giriş sırasında hata oluştu.', error });
  }
});
