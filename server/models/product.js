const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      text: true,
      unique: true,
      // maxlength: 32,

    },
    slug: {
      type: String,
      unique: true,
      lowercase: true, //chuyển thành chữ thường
      index: true,
    },
    description: {
      type: String,
      required: true,
      // maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      // maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Có", "Không"],
    },
    color: {
      type: String,
      // enum: ["Black", "Brown", "Silver", "White", "Blue"],
      ref: "Color",
    },
    brand: {
      type: String,
      // enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
      ref: "Brand",
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
