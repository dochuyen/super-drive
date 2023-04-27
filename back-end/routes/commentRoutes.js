import express from "express";

const commentRouter = express.Router();

commentRouter.post("/", async (req, res) => {
  console.log("Handling POST request to /api/v1/comments");
  try {
    const { username, email, comment } = req.body;
    if (!username || !email || !comment) {
      return res.status(400).json({
        message: "Name, email, or comment is missing",
      });
    }
    const data = {
      username,
      email,
      comment,
      createdAt: new Date(),
    };
    const result = await commentCollection.insertOne(data);
    console.log(result);
    return res.status(201).json({
      status: "ok",
      message: "Comment saved",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
});

export default commentRouter;
