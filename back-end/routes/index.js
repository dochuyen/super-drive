import productRouter from "./productRoutes.js";
import brandRouter from "./brandRoutes.js";
import userRouter from "./userRoutes.js";
import commentRouter from "./commentRoutes.js";
import cartRouter from "./cartRouter.js";
import addressRouter from "./addressRouter.js";
<<<<<<< HEAD
=======
import adminRouter from "./adminRouter.js";
>>>>>>> admin

const initRout = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/comments", commentRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/address", addressRouter);
<<<<<<< HEAD
=======
  app.use('/api/admin', adminRouter)
>>>>>>> admin
};
export default initRout;
