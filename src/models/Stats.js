import mongoose from "mongoose";

const StatSchema = new mongoose.Schema(
  {
    type: String,
    page: String,
    uri: String,
  },
  { timestamps: true }
);

export const Stat = mongoose.models?.Stat || mongoose.model("Stat", StatSchema);
