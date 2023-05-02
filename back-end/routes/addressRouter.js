import express from "express";
import * as proCtrls from '../controller/address.js'
const addressRouter=express.Router()

addressRouter.put('/add', proCtrls.addAddress)
export default addressRouter;