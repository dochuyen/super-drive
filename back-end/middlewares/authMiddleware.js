import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    console.log("AAAA", process.env.JWT_SECRET);
    // validate token
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    console.log("BBBB", token);
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if (email) {
      next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export default authMiddleware;
