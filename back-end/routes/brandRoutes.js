import express from "express";
import * as proCtrls from "../controller/brand.js";
const brandRouter = express.Router();

brandRouter.get("/", proCtrls.getAll);
brandRouter.get("/:id", proCtrls.getOne);
brandRouter.post("/", proCtrls.createBrand);
brandRouter.put("/:id", proCtrls.updateBrand);
brandRouter.delete("/:id", proCtrls.deleteBrand);

export default brandRouter;
