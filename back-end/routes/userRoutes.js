import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import * as userCtrls from "../controller/user.js";

const userRoutes = express.Router();

userRoutes.get("/:id", userCtrls.getUser);
userRoutes.post("/register");
userRoutes.post("/login");
userRoutes.put("/:id");

export default userRoutes;
