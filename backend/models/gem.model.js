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
    fileTree: [],
  },
  {
    timestamps: true,
  }
);

gemSchema.pre("save", function (next) {
  if (this.isNew && this.owner) {
    this.collaborator.push(this.owner);
  }

  next();
});

const gemModel = mongoose.model("gem", gemSchema);
export default gemModel;
