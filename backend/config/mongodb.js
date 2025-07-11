import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB = async () => {
  console.log("Mongo URI:", process.env.MONGODB); 
  console.log(process.env.ADMIN_EMAIL);

  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ DB Connected");
    });

    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
