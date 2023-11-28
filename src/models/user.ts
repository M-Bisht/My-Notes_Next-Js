import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notes: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId(),
      },
      isPinned: {
        type: Boolean,
        default: false,
      },
      lastUpdate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  trashNotes: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      lastUpdate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.models.User || model("User", userSchema);

export default User;
