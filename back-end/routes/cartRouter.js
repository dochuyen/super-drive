import express from "express";
import * as proCtrls from "../controller/addtocart.js"
const cartRouter = express.Router();
cartRouter.put('/', proCtrls.addToCart)
export default cartRouter
