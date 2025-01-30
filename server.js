import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Bağlantısı Başarılı"))
  .catch(err => console.error("❌ MongoDB Bağlantı Hatası:", err));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = 5003;
app.listen(PORT, () => console.log(`🚀 Backend ${PORT} portunda çalışıyor!`));
