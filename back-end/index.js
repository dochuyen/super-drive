import { config } from "dotenv";
config();
import express from "express";
import { client } from "./configs/connectDB.js";
import usesRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

import cors from "cors";
import productRouter from "./routes/productRoutes.js";
import brandRouter from "./routes/brandRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use("*", cors());

async function main() {
  try {
    // connect to mongodb
    await client.connect();
    console.log("Connected to mongodb successfully");

    // set up middlewares

    app.use(express.json());
    app.use("/api/v1/users", usesRoutes);
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/comments", commentRouter);
    app.use("/api/v1/brand", brandRouter);
    app.use("/api/v1/product", productRouter);

    // run server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Fails");
  }
}

main();
