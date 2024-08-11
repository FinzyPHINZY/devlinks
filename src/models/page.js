const { Schema, default: mongoose } = require("mongoose");

const PageSchema = new Schema(
  {
    uri: {
      type: String,
      required: true,
      unique: true,
      min: 1,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Page = mongoose.models?.Page || mongoose.model("Page", PageSchema);

export default Page;
