import jwt from "jsonwebtoken";
import Users from "../model/user.js";

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if (email) {
      const user = await Users.findOne({ email });
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error("Unauthorized");
      }
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { email, role } = jwt.verify(token, process.env.JWT_SECRET);
    if (email) {
      const user = await Users.findOne({ email });
      if (user) {
        req.user = user;
        req.role = role;
        next();
      } else {
        throw new Error("Unauthorized");
      }
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export { adminMiddleware, userMiddleware };
