import express from 'express';
import nodemailer from 'nodemailer';
import * as proCrtls from '../controller/user.js' 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const authRouter = express.Router();

authRouter.post('/login', proCrtls.loginUser );
authRouter.post('/register', proCrtls.registerUser);
export default authRouter;
