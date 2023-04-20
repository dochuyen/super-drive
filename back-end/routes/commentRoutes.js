import express from "express";
import { commentCollection } from "../configs/connectDB.js";

const commentRouter = express.Router();
commentRouter.post("/", async (req, res) => {
    console.log("Handling POST request to /api/v1/comments");
  const { username, email, comment } = req.body;
  if (!username || !email || !comment) {
    return res.status(400).json({
      message: "Name, email, or comment is missing",
    });
  }
  const result = await commentCollection.insertOne({
    username,
    email,
    comment,
    createdAt: new Date(),
  });
  return res.status(201).json({
    status: "ok",
    message: "Comment saved",
    data: result.ops[0],
  });
});

export default commentRouter;
