import React from "react";
import { Form, Input, Button } from "antd";
import { ShoppingOutlined } from '@ant-design/icons';

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <Form
    name="basic"
    labelCol={{ span: 100 }}
    wrapperCol={{ span: 160 }}
    style={{ maxWidth: 2000 }}
    onFinish={handleSubmit}>
    <Form.Item
      label="Tên danh mục"
      name="name"
      rules={[{
        required: true,
        message: 'Vui lòng nhập tên danh mục!'
      }]}>
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
);

export default CategoryForm;
