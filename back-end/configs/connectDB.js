import { mongoose } from "mongoose";
import { config } from "dotenv";
config();

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URL);
  } catch (error) {}
};

export default dbConnect;
