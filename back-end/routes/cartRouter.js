import express from "express";
import * as proCtrls from "../controller/addtocart.js"
const cartRouter = express.Router();
cartRouter.put('/add', proCtrls.addToCart)
cartRouter.delete('/delete/:productId', proCtrls.deleteCart )

export default cartRouter
