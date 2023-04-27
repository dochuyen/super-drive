import express from "express";
import postComment from "../controller/comment.js";

const commentRouter = express.Router();

commentRouter.post("/", postComment);

export default commentRouter;
