import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authCollection } from '../configs/connectDB.js';
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email or password is missing',
    });
  }
  const user = await authCollection.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({
      message: 'Password is incorrect',
    });
  }

  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  // send token to client
  const {cartitem}=user;
  return res.status(200).json({
    status: 'ok',
    message: 'Login success',
    data: {
      token,
      email,
      username: user.username,
      cartitem: cartitem ? cartitem : [],
    },
  });
});

authRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await authCollection.findOne({ email });
    if (user) {
      throw new Error('Email is already token');
    }

    const newUser = await authCollection.insertOne({
      username,
      email,
      password: passwordHash,
    });

    if (!newUser.acknowledged) {
      throw new Error('Register failed');
    }

    res.status(201).json({
      message: 'Register success',
      data: {
        _id: newUser.insertedId,
        username,
        email,
        password: passwordHash,
  
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail",
      data: null,
    });
  }
});
export default authRouter;
