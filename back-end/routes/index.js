import productRouter from "./productRoutes.js";
import brandRouter from "./brandRoutes.js";
import userRouter from "./userRoutes.js";
import commentRouter from "./commentRoutes.js";

const initRout = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/blog", commentRouter);
};
export default initRout;
