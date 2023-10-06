import React from "react";
import { Button, Form, Input } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

const CategoryForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {
  // destructure
  const {
    name,
    images,
  } = values;

  const onFinish = async () => {
    await handleSubmit();
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 3,
      }}
      wrapperCol={{
        span: 600,
      }}
      style={{
        maxWidth: 9000,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

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
          onChange={(e) => handleChange('name', e.target.value)}
          prefix={<ShoppingOutlined />}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-lg ant-btn-hover">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
