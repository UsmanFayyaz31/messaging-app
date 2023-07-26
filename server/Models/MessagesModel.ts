import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messagesSchema = new Schema({
  content: { type: String, required: true },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export default model("Messages", messagesSchema);
