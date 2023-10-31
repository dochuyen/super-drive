import express from "express";
import * as proCtrls from '../controller/address.js'
<<<<<<< HEAD
import userMiddleware from "../middlewares/userMiddleware.js";
=======
import {userMiddleware} from "../middlewares/userMiddleware.js";
>>>>>>> admin
const addressRouter=express.Router()

addressRouter.put('/add',userMiddleware, proCtrls.addAddress)
export default addressRouter;