import express from "express";
import * as proCtrls from "../controller/addtocart.js"
const cartRouter = express.Router();
cartRouter.put('/add', proCtrls.addToCart)
cartRouter.delete('/delete', proCtrls.deleteCart )
cartRouter.get('/get/:email', proCtrls.getCartItems )


export default cartRouter
