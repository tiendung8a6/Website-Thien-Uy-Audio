import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
import { message, Form, Select, Input, Button, notification } from 'antd';

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    // e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        message.success(`Danh mục con "${res.data.name}" đã được cập nhật thành công!`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400)
          notification.error({
            message: "Chỉnh sửa danh mục con thất bại!",
            description:
              'Lỗi dự đoán: Danh mục con đã tồn tại, Tên danh mục con quá ngắn hoặc quá dài (Từ 4 đến 35 ký tự).',
          });
      });
  };
  const { Option } = Select;

  const onFinish = async (values) => {
    await handleSubmit();
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
            <h4>Chỉnh sửa danh mục con</h4>
          )}

          <Form
            name="basic"
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 240,
            }}
            style={{
              maxWidth: 2000,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >

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
                onChange={(value) => setParent(value)} // Use 'value' directly
                placeholder="Vui lòng chọn danh mục từ danh sách"
              >
                <Option value="" disabled >Vui lòng chọn</Option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <Option key={c._id} value={c._id} selected={c._id === parent}>
                      {c.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên danh mục!'
                },
              ]}
            >
              <Input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                prefix={<ShoppingOutlined />}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 2, span: 10 }}
            >
              <Button type="primary" htmlType="submit" className="ml-2">
                Lưu lại
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
