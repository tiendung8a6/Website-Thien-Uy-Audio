const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      text: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true, //chuyển thành chữ thường
      index: true,
    },
    image: {
      type: Array,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
