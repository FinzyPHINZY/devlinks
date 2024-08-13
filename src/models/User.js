import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: String,
  image: String,
  emailVerified: Date,
});

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
