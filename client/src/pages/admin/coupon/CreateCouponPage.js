import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { Table, Space, Button, Popconfirm, Form, Input, message, Tooltip, Tag, notification } from "antd";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined, EditOutlined, CopyOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import LocalSearch from "../../../components/forms/LocalSearch";
import moment from "moment";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [keyword, setKeyword] = useState("");
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
    setLoading(true);
    removeCoupon(couponId, user.token)
      .then((res) => {
        loadAllCoupons(); // load all coupons
        setLoading(false);
        message.success(`Mã giảm giá "${res.data.name}" đã được xóa thành công!`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Coupon deletion failed");
      });
  };

  const handleCancelDelete = () => {
    message.error('Xóa thất bại');
  };

  const getStatus = (expiry) => {
    const currentDate = new Date();
    const expiryDate = new Date(expiry);

    if (expiryDate > currentDate) {
      return "Còn hạn";
    } else {
      return "Hết hạn";
    }
  };


  const handleCopy = (name) => {
    // Sao chép mã giảm giá vào clipboard
    navigator.clipboard.writeText(name).then(() => {
      // Thông báo cho người dùng rằng mã đã được sao chép thành công
      message.success(`Mã giảm giá "${name}" đã được sao chép vào clipboard!`);
    }).catch((error) => {
      // Xử lý lỗi nếu không thể sao chép vào clipboard
      console.error('Lỗi khi sao chép vào clipboard:', error);
      message.error('Không thể sao chép mã giảm giá vào clipboard.');
    });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    setLoading(true);

    // Check if the expiry date is not less than today's date
    const currentDate = new Date();
    if (expiry < currentDate) {
      setLoading(false);
      return message.error("Ngày hết hạn không được nhỏ hơn ngày hiện tại");
    }

    // Check if the discount is less than 100
    const discountValue = parseFloat(discount);
    if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
      setLoading(false);
      return message.error("Mã giảm giá phải lớn hơn 0 và nhỏ hơn hoặc bằng 100%");
    }

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName("");
        setDiscount("");
        setExpiry(new Date()); // Reset to the current date
        message.success(`Mã giảm giá "${res.data.name}" đã được tạo thành công!`, 1, () => {
          window.location.reload();
        });
        loadAllCoupons();
      })
      .catch((err) => {
        setLoading(false);
        console.log("create coupon err", err);
        notification.error({
          message: "Tạo mã giảm giá thất bại!",
          description:
            'Lỗi dự đoán: Mã giảm giá đã tồn tại, Mã quá ngắn hoặc quá dài (Từ 4 đến 35 ký tự).',
        });
      });
  };

  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "name",
      key: "name",
      width: 150, // Độ rộng của cột
    },
    {
      title: "% Giảm",
      dataIndex: "discount",
      key: "discount",
      width: 80, // Độ rộng của cột
      render: (text, record) => <span>{record.discount}%</span>,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiry",
      key: "expiry",
      width: 100, // Độ rộng của cột
      render: (text, record) => (
        <span>{moment(record.expiry).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "expiry",
      key: "status",
      width: 100,
      render: (text, record) => {
        const status = getStatus(record.expiry);
        return (
          <Tag color={status === "Còn hạn" ? "green" : "red"}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Ngày tạo mã', // Tên cột ngày cập nhật
      dataIndex: 'createdAt', // Tên trường ngày cập nhật trong dữ liệu
      key: 'createdAt', // Khóa của cột
      width: 150, // Độ rộng của cột
      render: (text, record) => (
        <span>{moment(record.createdAt).format('DD/MM/YYYY - HH:mm:ss')}</span>
      ), // Định dạng ngày cập nhật 
    },
    {
      title: "Xóa",
      key: "action",
      width: 120, // Độ rộng của cột
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Sao chép">
            <Button
              icon={<CopyOutlined />}
              type="primary"
              onClick={() => handleCopy(record.name)}
              className='d-flex align-items-center'>
              Sao chép
            </Button>
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc muốn xóa mã giảm giá này!"
            // description="Are you sure to delete this task?"
            onConfirm={() => handleRemove(record._id)}
            onCancel={handleCancelDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              type="danger"
              className='d-flex align-items-center'>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Tạo mã giảm giá</h4>
          )}

          <Form
            name="basic"
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 204,
            }}
            style={{
              maxWidth: 2000,
            }}
            onFinish={handleSubmit}>
            <Form.Item
              label="Mã giảm giá"
              name="name"
              rules={[{
                required: true,
                message: 'Vui lòng nhập mã giảm giá!'
              }]}>
              <Input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value.trim())} // Sử dụng trim() để xóa khoảng trắng ---old---> onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
              />
            </Form.Item>

            <Form.Item
              label="% Giảm"
              name="discount"
              rules={[{
                required: true,
                message: 'Vui lòng nhập % giảm!'
              },
              ]}
            >
              <Input
                type="number"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
              />
            </Form.Item>

            <Form.Item
              label="Ngày hết hạn"
              name="expiry"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày hết hạn!",
                },
              ]}
            >
              <DatePicker
                className="form-control"
                selected={expiry}
                // selected={new Date()}
                minDate={new Date()} // Set the minimum date to today's date
                onChange={(date) => setExpiry(date)}
                value={expiry}
                placeholderText="Vui lòng chọn"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 3, span: 10 }}
            >
              <Button type="primary" htmlType="submit" className="ml-2">
                Lưu lại
              </Button>
            </Form.Item>
          </Form>

          <h4 className="text-center mb-8">~~ Danh sách mã giảm giá ~~</h4>

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <Table
            dataSource={coupons.filter(c => c.name.toLowerCase().includes(keyword))}
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
