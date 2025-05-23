import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    collection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gem",
      },
    ],
    sentInvites: [
      {
        recievers: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        ],
        gem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "gem",
        },
      },
    ],
    recievedInvites: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        gem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "gem",
        },
      },
    ],
    isActive: Boolean,
    socketId: String,
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = async function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
