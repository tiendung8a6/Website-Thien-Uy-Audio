import React from "react";
import { Button, Form, Input } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogCreateForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {
  // destructure
  const {
    title,
    content,
    images,
  } = values;

  const onFinish = async () => {
    await handleSubmit();
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    handleChange('content', data);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 2,
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
        label="Tiêu đề"
        name="title"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tiêu đề!",
          },
        ]}
      >
        <Input
          value={title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Nội dung"
        name="content"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập nội dung cho blog!",
          },
        ]}
      >
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={handleEditorChange}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
        <Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-lg ant-btn-hover">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BlogCreateForm;
