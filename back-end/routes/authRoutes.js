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

authRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'Email is missing',
    });
  }

  try {
    const user = await authCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m',
      }
    );

    const resetPasswordLink = `https://example.com/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Reset password link',
      html: `<p>Please click the link below to reset your password:</p><p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Email sending failed',
          data: null,
        });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({
          status: 'ok',
          message: 'A reset password link has been sent to your email',
          data: {
            resetPasswordLink,
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error',
      data: null,
    });
  }
});


// Change Password
authRouter.post('/change-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({
      message: 'Token or new password is missing',
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authCollection.findOne({ _id: decodedToken._id });

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const passwordHash = bcrypt.hashSync(newPassword, 10);

    const result = await authCollection.updateOne(
      { _id: user._id },
      { $set: { password: passwordHash } }
    );

    if (!result.acknowledged) {
      throw new Error('Change password failed');
    }

    return res.status(200).json({
      status: 'ok',
      message: 'Password has been changed',
      data: null,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        message: 'Token has expired',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({
        message: 'Invalid token',
      });
    }

    res.status(500).json({
      message: 'Server error',
      data: null,
    });
  }
});

export default authRouter;
