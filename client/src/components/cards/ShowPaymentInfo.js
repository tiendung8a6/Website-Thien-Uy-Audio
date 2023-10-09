import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Id đơn hàng: {order.paymentIntent.id}</span>
      {" |"}
      <span>
        Số lượng:{" |"}
        {(order.paymentIntent.amount /= 100).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </span>
      {" |"}
      <span>

        Tiền tệ: {order.paymentIntent.currency.toUpperCase()}</span>
      {" |"}
      <span>Phương thức: {order.paymentIntent.payment_method_types[0]}</span>
      {" |"}
      <span>Sự chi trả: {order.paymentIntent.status.toUpperCase()}</span>
      {" |"}
      <span>
        Đặt hàng vào:{" |"}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" |"}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          Trạng thái: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
