import Users from "../model/user.js";
const addToCart = async (req, res) => {
  const { email, productId, title, quantity, price } = req.body;
  console.log(quantity, productId, title, price);
  try {
    if (!email || !productId || !quantity || !title || !price) {
      return res.status(400).json({
        message: "Missing email, productId,title or quantity",
      });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const cartItemIndex = -1;
    const cartItem = user.cartitem.find((item) => {
      item.productId = productId;
      item.title = title;
      item.price = price;
    });

    if (cartItem) {
      const updatedCartItem = {
        ...cartItem,
        quantity: cartItem.quantity + quantity,
      };
      user.cartitem[cartItemIndex] = updatedCartItem;
    } else {
      // Add new cart item
      user.cartitem.push({ productId, title, quantity, price });
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

    return res.status(400).json({
      message: "Error adding product to cart",
      data: null,
    });
  }
};
const deleteCart = async (req, res) => {
  const { email, productId } = req.body;

  try {
    if (!email || !productId) {
      return res.status(400).json({
        message: "Missing email or productId",
      });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const cartItemIndex = user.cartitem.findIndex(
      (item) => item.productId === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    user.cartitem.splice(cartItemIndex, 1);
    await user.save();

    return res.status(200).json({
      status: "ok",
      message: "Product removed from cart",
      data: {
        email,
        username: user.username,
        cartitem: user.cartitem,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error removing product from cart",
      data: null,
    });
  }
};

export { addToCart,deleteCart };
