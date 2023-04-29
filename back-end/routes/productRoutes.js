import express from "express";
// import uploadCloud from "../configs/cloudinary.config.js";
import * as proCtrl from "../controller/product.js";
const productRouter = express.Router();

productRouter.get("/getBrand/:brandId", proCtrl.getBrand);
productRouter.get("/", proCtrl.getAllProducts);
productRouter.get("/sort", proCtrl.getProducts);
productRouter.post("/", proCtrl.createProducts);
// productRouter.put(
//   "/uploadimage/:pid",
//   uploadCloud.array("images", 5),
//   proCtrl.uploadImageProduct
// );
productRouter.put("/:pid", proCtrl.updateProducts);
productRouter.delete("/:pid", proCtrl.deleteProducts);
productRouter.put("/rating", proCtrl.ratings);

export default productRouter;
