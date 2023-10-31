import express from "express";
import * as proCtrls from '../controller/address.js'
import {userMiddleware} from "../middlewares/userMiddleware.js";
const addressRouter=express.Router()

addressRouter.put('/add',userMiddleware, proCtrls.addAddress)
export default addressRouter;