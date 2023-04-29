import Users from "../model/user.js";
const addToCart = async (req, res) => {
    const { email, productId, quantity } = req.body;
    console.log(quantity, productId);
    try {
      if (!email || !productId || !quantity) {
        return res.status(400).json({
          message: "Missing email, productId, or quantity",
        });
      }
  
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
  
      // Check if product already exists in cart
      let cartItemIndex = -1;
      const cartItem = user.cartitem.find((item) => {
        item.productId = productId
      });
  
      if (cartItem) {
        // Update existing cart item
        const updatedCartItem = {
          ...cartItem,
          quantity: cartItem.quantity + quantity,
        };
        user.cartitem[cartItemIndex] = updatedCartItem;
      } else {
        // Add new cart item
        user.cartitem.push({ productId, quantity });
      }
  
      await user.save();
  
      return res.status(200).json({
        status: "ok",
        message: "Product added to cart",
        data: {
          email,
          username: user.username,
          cartitem: user.cartitem,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "Error adding product to cart",
        data: null,
      });
    }
  };
  export {addToCart}