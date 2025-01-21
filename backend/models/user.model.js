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
        recieverIds: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        ],
        gemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "gem",
        },
      },
    ],
    recievedInvites: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        gemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "gem",
        },
      },
    ],
    isActive: Boolean,
  },
  {
    timestamps: true,
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
