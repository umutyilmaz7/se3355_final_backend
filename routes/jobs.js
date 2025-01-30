import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// 📌 Tüm ilanları getir
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'İlanlar alınırken hata oluştu.', error });
  }
});

// 📌 Tek ilan getir (id ile)
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({ id: parseInt(req.params.id, 10) });
    if (!job) return res.status(404).json({ message: 'İlan bulunamadı!' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'İlan detayları alınamadı.', error });
  }
});

export default router;
