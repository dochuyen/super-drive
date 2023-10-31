import express from "express";
import * as proCtrls from "../controller/addtocart.js"
import {userMiddleware} from "../middlewares/userMiddleware.js";
const cartRouter = express.Router();
cartRouter.put('/add', userMiddleware ,proCtrls.addToCart)
cartRouter.delete('/delete/:productId',userMiddleware, proCtrls.deleteCart )
cartRouter.get('/get',userMiddleware, proCtrls.getCartItems )


export default cartRouter
