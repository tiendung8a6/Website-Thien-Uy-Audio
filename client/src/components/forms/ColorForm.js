import React from "react";
import { Form, Input, Button } from "antd";
import { ShoppingOutlined } from '@ant-design/icons';

const ColorForm = ({ handleSubmit, name, setName }) => (
  <Form
    name="basic"
    labelCol={{ span: 2 }}
    wrapperCol={{ span: 304 }}
    style={{ maxWidth: 2000 }}
    onFinish={handleSubmit}>
    <Form.Item
      label="Tên màu"
      name="name"
      rules={[{
        required: true,
        message: 'Vui lòng nhập tên màu!'
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

export default ColorForm;
