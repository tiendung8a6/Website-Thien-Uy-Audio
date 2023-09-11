const Coupon = require("../models/coupon");

// create, remove, list

// exports.create = async (req, res) => {
//   try {
//     // console.log(req.body);
//     // return;
//     const { name, expiry, discount } = req.body;  //req.body.coupon; --> change remove .coupon
//     res.json(await new Coupon({ name, expiry, discount }).save());
//   } catch (err) {
//     console.log(err);
//   }
// };


exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;  //req.body.coupon; --> change remove .coupon
    const currentDate = new Date();
    if (new Date(expiry) < currentDate) {
      return res.status(400).json({ error: "Expiry date cannot be in the past" });
    }
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
  }
};
