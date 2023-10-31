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
        if (user.role === "admin") {
          req.user = user;
          next();
        } else {
          throw new Error("Unauthorized: Insufficient permissions");
        }
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

export default userMiddleware;
