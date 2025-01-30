import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env dosyasındaki MongoDB bağlantısını kullan

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  city: String,
  workPreference: String,
  description: String,
  requirements: {
    experience: String,
    educationLevel: String,
    militaryStatus: String,
  },
  lastUpdated: String,
  numberOfApplications: Number,
});

const Job = mongoose.model("Job", jobSchema);

const addJob = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB bağlantısı başarılı!");

  const newJob = new Job({
    title: "Yazılım Uzmanı",
    company: "Alfemo",
    city: "İzmir",
    workPreference: "Ofiste",
    description: "Yazılım geliştirme konusunda deneyimli adaylar aranıyor.",
    requirements: {
      experience: "2 yıl tecrübeli",
      educationLevel: "Üniversite Mezunu",
      militaryStatus: "Yapıldı",
    },
    lastUpdated: "Bugün güncellendi",
    numberOfApplications: 10,
  });

  await newJob.save();
  console.log("✅ İlan başarıyla eklendi!");
  process.exit();
};

addJob();
