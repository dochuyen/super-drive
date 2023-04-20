import { config } from "dotenv";
config();
import express from "express";
import { client } from "./configs/connectDB.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT;

app.use('*', cors())

async function main() {
  try {
    // connect to mongodb
    await client.connect();
    console.log("Connected to mongodb successfully");

    // set up middlewares
    app.use(express.json());
    app.use("/api/v1/students", studentRoutes);
    app.use("/api/v1/auth", authRoutes);
    
    // run server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    // handle error here
  }
}

main();
