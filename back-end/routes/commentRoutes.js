import express from "express";
import * as proControl from "../controller/comment.js";

const commentRouter = express.Router();

commentRouter.post("/", proControl.postComment);
commentRouter.get('/get', proControl.getComment)

export default commentRouter;
