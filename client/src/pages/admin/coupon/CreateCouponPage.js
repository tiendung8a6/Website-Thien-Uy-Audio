import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { Table, Space, Button, Popconfirm } from "antd";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import moment from "moment";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date()); // Initialize with the current date
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data));
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error("Coupon deletion failed");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the expiry date is not less than today's date
    const currentDate = new Date();
    if (expiry < currentDate) {
      setLoading(false);
      return toast.error("Expiry date cannot be in the past");
    }

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName("");
        setDiscount("");
        setExpiry(new Date()); // Reset to the current date
        toast.success(`Coupon "${res.data.name}" is created`);
      })
      .catch((err) => {
        setLoading(false);
        console.log("create coupon err", err);
        toast.error("Coupon creation failed");
      });
  };

  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiry",
      key: "expiry",
      render: (text, record) => (
        <span>{moment(record.expiry).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "% Giảm",
      dataIndex: "discount",
      key: "discount",
      render: (text, record) => <span>{record.discount}%</span>,
    },
    {
      title: "Xóa",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleRemove(record._id)}
            icon={<DeleteOutlined />}
            type="danger"
            className='d-flex align-items-center'>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Tạo mã giảm giá</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={expiry}
                minDate={new Date()} // Set the minimum date to today's date
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>

            <button className="btn btn-outline-primary">Save</button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <Table
            dataSource={coupons}
            columns={columns}
            rowKey={(record) => record._id}
            pagination={{
              current: currentPage,
              pageSize: itemsPerPage,
              total: coupons.length,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: handlePageChange,
              pageSizeOptions: ["10", "20", "30", "50", "100"],
              showQuickJumper: true,
              showSizeChanger: true,
              position: ["bottomCenter"],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
