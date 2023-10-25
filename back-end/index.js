import { config } from "dotenv";
config();
import express from "express";
import dbConnect from "./configs/connectDB.js";
import initRout from "./routes/index.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

initRout(app);
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
