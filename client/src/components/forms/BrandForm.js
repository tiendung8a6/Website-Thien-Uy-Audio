import React from "react";
import { Form, Input, Button } from "antd";
import { ShoppingOutlined } from '@ant-design/icons';

const BrandForm = ({ handleSubmit, name, setName }) => (
  <Form
    name="basic"
    labelCol={{ span: 3 }}
    wrapperCol={{ span: 204 }}
    style={{ maxWidth: 2000 }}
    onFinish={handleSubmit}>
    <Form.Item
      label="Tên thương hiệu"
      name="name"
      rules={[{
        required: true,
        message: 'Vui lòng nhập tên thương hiệu!'
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
      wrapperCol={{ offset: 3, span: 16 }}
    >
      <Button type="primary" htmlType="submit" className="ml-2">
        Lưu lại
      </Button>
    </Form.Item>
  </Form>
);

export default BrandForm;
