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

    // Check if product already exists in cart
    let cartItemIndex = -1;
    const cartItem = user.cartitem.find((item) => {
      item.productId = productId;
      item.title = title;
      item.price = price;
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
    console.log(error);
    return res.status(400).json({
      message: "Error adding product to cart",
      data: null,
    });
  }
};
const deleteCart=async (req, res) => {
  const productId = req.params.productId;

  try {
    // Xóa sản phẩm khỏi danh sách sản phẩm trong giỏ hàng
    const cart = await Users.findOneAndUpdate(
      {},
      { $pull: { items: { productId: productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart not found",
      });
    }

    // Trả về phản hồi nếu xóa thành công
    return res.status(200).json({
      status: "ok",
      message: "Product removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
export { addToCart,deleteCart };
