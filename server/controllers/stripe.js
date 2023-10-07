const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const { couponApplied } = req.body;

  // Lấy thông tin người dùng
  const user = await User.findOne({ email: req.user.email }).exec();

  // Lấy tổng giá trị giỏ hàng của người dùng
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderdBy: user._id,
  }).exec();

  let finalAmount = 0;

  // Kiểm tra xem có áp dụng mã giảm giá không và tính giá cuối cùng
  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount;
  } else {
    finalAmount = cartTotal;
  }

  // Chuyển đổi giá thành tiền tệ VND (theo định dạng Stripe, VND có mã là 'vnd')
  const vndAmount = finalAmount * 100; // Stripe yêu cầu số tiền phải được truyền dưới dạng cents

  // Tạo payment intent với số tiền và tiền tệ là VND
  const paymentIntent = await stripe.paymentIntents.create({
    amount: vndAmount,
    currency: "vnd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount, // Số tiền cần thanh toán của người dùng (đã được chuyển đổi về VND)
  });
};
