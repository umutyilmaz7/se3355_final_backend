import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  country: String,
  city: String,
  photo: String
});

const User = mongoose.model('User', userSchema);
export default User;
