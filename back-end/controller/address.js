import Users from "../model/user.js";
import mongoose from "mongoose";
const addAddress = async (req, res) => {
  const email = req.user.email;

  const { address, city, country, phone, notes } = req.body;
  try {
    if (!address||!email || !city || !country || !phone) {
      return req.status(400).json({
        message: "Missing email, city, country or phone",
      });
    }

    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const indexToDelete = user.address.find((address) => {
      return (
        address.address === address &&
        address.city === city &&
        address.country === country &&
        address.phone === phone &&
        address.notes === notes
      );
    });

    const newAddress = {
      _id: new mongoose.Types.ObjectId(),
      address,
      city,
      country,
      phone,
      notes,
    };

    if (indexToDelete !== -1) {
      user.address.splice(indexToDelete, 1, newAddress);
    } else {
      user.address.push(newAddress);
    }

    await user.save();

    return res.status(200).json({
      status: "ok",
      message: "Address added",
      data: {
        email,
        username: user.username,
        address: user.address,
        cartitem: user.cartitem,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error adding address",
      data: null,
    });
  }
};
export { addAddress };
