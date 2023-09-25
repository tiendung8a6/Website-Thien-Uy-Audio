const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //Cắt khoảng thắng
      unique: true, //Duy nhất
      uppercase: true,
      // required: "Name is required",
      minlength: [4, "Too short"],
      maxlength: [35, "Too long"],
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      requred: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
