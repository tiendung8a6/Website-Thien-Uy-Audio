import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createColor,
  getColors,
  removeColor,
} from "../../../functions/color";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ColorForm from "../../../components/forms/ColorForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { Table, Button, Space, Pagination, Popconfirm, notification } from 'antd';
import { message } from 'antd';
import moment from 'moment';

const ColorCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); //Hiển thị số trang mặc định là...

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = () =>
    getColors().then((cl) => setColors(cl.data));

  const handleSubmit = (values) => {
    setLoading(true);
    createColor({ name: values.name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        message.success(`Màu "${res.data.name}" đã được tạo thành công!`, 1, () => {
          window.location.reload();
        });
        loadColors();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400)
          notification.error({
            message: "Tạo màu thất bại!",
            description:
              'Lỗi dự đoán: Màu đã tồn tại, Màu quá ngắn hoặc quá dài (Từ 1 đến 35 ký tự).',
          });
      });
  };

  const handleConfirmDelete = async (slug) => {
    setLoading(true);
    removeColor(slug, user.token)
      .then((res) => {
        setLoading(false);
        message.success(`Màu "${res.data.name}" đã được xóa thành công!`);
        loadColors();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
  };

  const handleCancelDelete = () => {
    message.error('Xóa thất bại');
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
  };

  const calculateIndex = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Tạo màu sắc</h4>
          )}

          <ColorForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <h4 className="text-center mb-8">~~ Danh sách màu sắc ~~</h4>

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {/* step 5 */}
          <Table
            dataSource={colors.filter(cl => cl.name.toLowerCase().includes(keyword))}
            columns={[
              {
                title: 'STT',
                key: 'stt',
                width: 30, // Đặt độ rộng của cột STT
                render: (text, record, index) => (
                  <span>{calculateIndex(index)}</span>
                ),
              },
              {
                title: 'Tên màu',
                dataIndex: 'name',
                key: 'name',
                width: 200, // Đặt độ rộng của cột STT
              },
              {
                title: 'Ngày cập nhật', // Tên cột ngày cập nhật
                dataIndex: 'updatedAt', // Tên trường ngày cập nhật trong dữ liệu
                key: 'updatedAt', // Khóa của cột
                width: 150, // Độ rộng của cột
                render: (text, record) => (
                  <span>{moment(record.updatedAt).format('DD/MM/YYYY - HH:mm:ss')}</span>
                ), // Định dạng ngày cập nhật 
              },
              {
                title: 'Chỉnh sửa',
                key: 'actions',
                width: 50, // Đặt độ rộng của cột STT
                render: (text, record) => (
                  <Space size="middle">
                    <Link to={`/admin/color/${record.slug}`}>
                      <Button
                        icon={<EditOutlined />}
                        type="primary"
                        className='d-flex align-items-center '>
                        Sửa
                      </Button>
                    </Link>
                    <Popconfirm
                      title="Bạn có chắc muốn xóa màu này!"
                      // description="Are you sure to delete this task?"
                      onConfirm={() => handleConfirmDelete(record.slug)}
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
            ]}
            rowKey={(record) => record._id}
            pagination={{
              current: currentPage,
              pageSize: itemsPerPage,
              total: colors.length,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: handlePageChange,
              pageSizeOptions: ['10', '20', '30', '50', '100'],
              showQuickJumper: true, // Cho phép nhập trực tiếp số trang cần đến
              showSizeChanger: true, // Cho phép thay đổi số lượng mục trên mỗi trang
              position: ["bottomCenter"], // Đặt vị trí của Pagination
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorCreate;
