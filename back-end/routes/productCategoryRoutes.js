import express from "express";
import * as proCtrl from "../controller/productCategory.js";
import productRouter from "./productRoutes.js";
const proCategoryRouter = express.Router();

proCategoryRouter.post("/", proCtrl.createCategory);
proCategoryRouter.get("/", proCtrl.getAllCategory);
proCategoryRouter.put("/:id", proCtrl.updateCategory);
proCategoryRouter.delete("/:id", proCtrl.deleteCategory);

export default proCategoryRouter;
