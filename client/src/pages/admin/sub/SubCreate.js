import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSub, removeSub, getSubs } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { message, Button, Form, Input, Select, Space, Table, Popconfirm } from 'antd';
import moment from 'moment';

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => {
    getSubs()
      .then((s) => setSubs(s.data))
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleSubmit = (values) => {
    setLoading(true);
    createSub({ name: values.name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        message.success(`Danh mục con "${res.data.name}" đã được tạo thành công!`, 1.2, () => {
          window.location.reload();
        });
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleConfirmDelete = async (slug) => {
    setLoading(true);
    removeSub(slug, user.token)
      .then((res) => {
        setLoading(false);
        message.error(`Danh mục con "${res.data.name}" đã được xóa thành công!`);
        loadSubs();
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

  const { Option } = Select;
  const onFinish = async (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Tạo danh mục con</h4>
          )}

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
          </Form>

          <Form.Item
            label="Danh mục cha"
            name="category"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn danh mục cha từ danh sách!",
              },
            ]}
          >
            <Select
              name="category"
              className="form-control"
              onChange={(value) => setCategory(value)} // Use 'value' directly
              placeholder="Vui lòng chọn danh mục từ danh sách"
            >
              <Option value="" disabled >Vui lòng chọn</Option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <h4 className="text-center mb-8">~~ Danh sách danh mục con ~~</h4>

          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */}
          <Table
            dataSource={subs.filter(searched(keyword))}
            columns={[
              {
                title: 'STT',
                key: 'stt',
                width: 30,
                render: (text, record, index) => (
                  <span>{calculateIndex(index)}</span>
                ),
              },
              {
                title: 'Tên danh mục',
                dataIndex: 'name',
                key: 'name',
                width: 200,
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
                width: 50,
                render: (text, record) => (
                  <Space size="middle">
                    <Link to={`/admin/sub/${record.slug}`}>
                      <Button icon={<EditOutlined />} type="primary">
                        Sửa
                      </Button>
                    </Link>
                    <Popconfirm
                      title="Bạn có chắc muốn xóa danh mục con này!"
                      // description="Are you sure to delete this task?"
                      onConfirm={() => handleConfirmDelete(record.slug)}
                      onCancel={handleCancelDelete}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        type="danger"
                      >
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
              total: subs.filter(searched(keyword)).length,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              onChange: handlePageChange,
              pageSizeOptions: ['10', '20', '30', '50', '100'],
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

export default SubCreate;
