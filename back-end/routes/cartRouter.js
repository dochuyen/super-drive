import express from "express";
import * as proCtrls from "../controller/addtocart.js"
<<<<<<< HEAD
import userMiddleware from "../middlewares/userMiddleware.js";
=======
import {userMiddleware} from "../middlewares/userMiddleware.js";
>>>>>>> admin
const cartRouter = express.Router();
cartRouter.put('/add', userMiddleware ,proCtrls.addToCart)
cartRouter.delete('/delete/:productId',userMiddleware, proCtrls.deleteCart )
cartRouter.get('/get',userMiddleware, proCtrls.getCartItems )


export default cartRouter
