const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //Cắt khoảng trắng
      unique: true,
      required: "Name is required",
      minlength: [4, "Too short"],
      maxlength: [40, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
