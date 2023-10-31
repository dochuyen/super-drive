import express from "express";
import {adminMiddleware} from "../middlewares/userMiddleware.js";

import * as adminCtrls from "../controller/admin.js";

const adminRouter = express.Router();
adminRouter.get("/",adminMiddleware, adminCtrls.getAll);
adminRouter.get("/:id", adminCtrls.getUser);
adminRouter.post("/register", adminCtrls.userRegister);
adminRouter.post("/login", adminCtrls.userLogin);
adminRouter.put("/change-password", adminMiddleware, adminCtrls.changePassword);
adminRouter.delete("/:id", adminCtrls.deleteUser);

export default adminRouter;