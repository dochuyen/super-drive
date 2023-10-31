import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cartitem: {
      type: Array,
      default: [],
    },
    address: {
      type: Array,
      default: [],
    },

    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
