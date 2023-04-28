
import Users from "../model/user.js";
import bcrypt from "bcrypt"

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await Users.findById(id);

    res.json(user);
  } catch (error) {}
};
const userLogin=async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email or password is missing',
    });
  }
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({
      message: 'Password is incorrect',
    });
  }

  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  // send token to client
  const {cartitem}=user;
  return res.status(200).json({
    status: 'ok',
    message: 'Login success',
    data: {
      token,
      email,
      username: user.username,
      cartitem: cartitem ? cartitem : [],
    },
  });
}
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await Users.findOne({ email });
    if (user) {
      throw new Error('Email is already taken');
    }

    const newUser = await Users.create({
      username,
      email,
      password: passwordHash,
    });

    if (!newUser) {
      throw new Error('Register failed');
    }

    res.status(201).json({
      message: 'Register success',
      data: {
        _id: newUser._id,
        username,
        email,
        password: passwordHash,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: 'Fail',
      data: null,
    });
  }
};

export { getUser, userLogin, userRegister };
