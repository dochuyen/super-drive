
const ensureCartitem = async (req, res, next) => {
    const { email } = req.user; 
    const user = await authCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (!user.cartitem) {
      user.cartitem = [];
      await authCollection.updateOne({ email }, { $set: { cartitem: [] } });
    }
    req.user.cartitem = user.cartitem;
    next();
  };
  