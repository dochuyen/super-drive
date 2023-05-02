import express from "express";
import * as proCtrl from "../controller/product.js";
const productRouter = express.Router();
import uploadCloud from "../configs/cloudinary.config.js";

productRouter.get("/getBrand/:brandId", proCtrl.getBrand);
productRouter.get("/", proCtrl.getAllProducts);
productRouter.get("/shopdetail/:id", proCtrl.getOneProducts);
productRouter.get("/search", proCtrl.searchProducts);

productRouter.post("/", uploadCloud.array("images", 5), proCtrl.createProducts);
productRouter.put(
  "/uploadimage/:pid",
  uploadCloud.array("images", 5),
  proCtrl.uploadImageProduct
);
productRouter.put("/:pid", proCtrl.updateProducts);
productRouter.delete("/:pid", proCtrl.deleteProducts);

export default productRouter;
