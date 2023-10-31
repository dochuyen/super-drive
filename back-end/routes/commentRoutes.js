import express from "express";
import * as proControl from "../controller/comment.js";
<<<<<<< HEAD
import userMiddleware from "../middlewares/userMiddleware.js";
=======
import {userMiddleware} from "../middlewares/userMiddleware.js";
>>>>>>> admin
const commentRouter = express.Router();

commentRouter.post("/", userMiddleware,proControl.postComment);
commentRouter.get('/get', proControl.getComment)

export default commentRouter;
