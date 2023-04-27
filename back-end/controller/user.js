import mongoose from "mongoose";
import Users from "../model/user.js";
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await Users.findById(id);

    res.json(user);
  } catch (error) {}
};
export { getUser };
