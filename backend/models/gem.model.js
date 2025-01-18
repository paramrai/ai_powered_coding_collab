import mongoose from "mongoose";

const gemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    collaborator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    fileTree: [
      {
        name: String,
        type: String,
        content: String,
        children: [{}],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const gemModel = mongoose.model("gem", gemSchema);
export default gemModel;
