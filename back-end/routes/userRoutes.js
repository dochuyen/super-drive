import express from "express";
import {userMiddleware} from "../middlewares/userMiddleware.js";

import * as userCtrls from "../controller/user.js";

const userRoutes = express.Router();
userRoutes.get("/", userCtrls.getAll);
userRoutes.get("/:id", userCtrls.getUser);
userRoutes.post("/register", userCtrls.userRegister);
userRoutes.post("/login", userCtrls.userLogin);
userRoutes.put("/change-password", userMiddleware, userCtrls.changePassword);
userRoutes.delete("/:id", userCtrls.deleteUser);

export default userRoutes;
