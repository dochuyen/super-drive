import Admins from "../model/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const user = await Admins.find().then((data) => {
      return res.status(200).json({
        success: data,
        data: data,
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await Admins.findById(id);
    res.json(user);
  } catch (error) {}
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await Admins.findByIdAndDelete(id);
    if (!deleteUser) throw new Error("deleteUser not found");
    return res.status(200).json({
      success: true,
      data: deleteUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or password is missing",
    });
  }
  const user = await Admins.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    {}
  );

  // send token to client

  return res.status(200).json({
    status: "ok",
    message: "Login success",
    data: {
      token,
      email,
      username: user.username,
      role: user.role,
      cartitem: user.cartitem,
    },
  });
};
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await Admins.findOne({ email });
    if (user) {
      throw new Error("Email is already taken");
    }

    const newUser = await Admins.create({
      username,
      email,
      password: passwordHash,
    });

    if (!newUser) {
      throw new Error("Register failed");
    }

    res.status(201).json({
      message: "Register success",
      data: {
        _id: newUser._id,
        username,
        email,
        password: passwordHash,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Fail",
      data: null,
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await Admins.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Mật khẩu hiện tại không đúng" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Mật khẩu đã được thay đổi thành công" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Lỗi máy chủ");
  }
};

export { getUser, userLogin, userRegister, changePassword, getAll ,deleteUser};
