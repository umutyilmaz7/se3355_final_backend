import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  id: Number,
  title: String,
  company: String,
  city: String,
  town: String,
  country: String,
  workPreference: String,
  positionLevel: String,
  department: String,
  employmentType: String,
  lastUpdated: String,
  numberOfApplications: Number,
  description: String,
  requirements: {
    experience: String,
    educationLevel: String,
    militaryStatus: String
  },
  related: [Number]
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
