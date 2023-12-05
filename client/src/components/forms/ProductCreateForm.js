import React from "react";
import { Button, Form, Input, Select } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/uploadadapter';

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,

  setValues,
  values,
  handleCatagoryChange,
  handleBrandChange,
  handleColorChange,
  subOptions,
  showSub,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    status,
    Guarantee,
    Origin,
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
    handleChange('description', data);

  };
  // const editorConfiguration = {
  //   plugins: [UploadAdapter],
  //   // other CKEditor configuration options
  // };
  return (
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
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Tên sản phẩm"
        name="title"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên sản phẩm!",
          },
        ]}
      >
        <Input
          value={title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Tình trạng sản phẩm"
        name="status"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Tình trạng sản phẩm!",
          },
        ]}
      >
        <Input
          value={status}
          onChange={(e) => handleChange('status', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label=" Bảo hành"
        name="Guarantee"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Bảo hành!",
          },
        ]}
      >
        <Input
          value={Guarantee}
          onChange={(e) => handleChange('Guarantee', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label=" Nơi sản xuất"
        name="Origin"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Bảo hành!",
          },
        ]}
      >
        <Input
          value={Origin}
          onChange={(e) => handleChange('Origin', e.target.value)}
        />
      </Form.Item>




      {/* <Form.Item
        label="Mô tả cho sản phẩm"
        name="description"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mô tả cho sản phẩm!",
          },
        ]}
      >
        <Input
          value={description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </Form.Item> */}

      <Form.Item
        label="Mô tả cho sản phẩm"
        name="description"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mô tả cho sản phẩm!",
          },
        ]}
      >
        <CKEditor
          editor={ClassicEditor}
          // config={editorConfiguration}
          data={description}
          onChange={handleEditorChange}
        />
      </Form.Item>


      <Form.Item
        label="Giá tiền"
        name="price"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập giá tiền!",
          },
        ]}
      >
        <Input
          type="number"
          value={price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
      </Form.Item>


      <Form.Item
        label="Giao hàng"
        name="shipping"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn trạng thái!",
          },
        ]}
      >
        <Select onChange={(value) => handleChange('shipping', value)} value={shipping} placeholder="Vui lòng chọn trạng thái">
          <Option value="" disabled > Vui lòng chọn</Option>
          <Option value="Không">Không</Option>
          <Option value="Có">Có</Option>
        </Select>
      </Form.Item>


      <Form.Item
        label="Số lượng"
        name="quantity"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số lượng!",
          },
        ]}
      >
        <Input
          type="number"
          value={quantity}
          onChange={(e) => handleChange('quantity', e.target.value)}
        />
      </Form.Item>


      <Form.Item
        label="Màu sắc"
        name="color"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn chọn màu sắc!",
          },
        ]}
      >
        <Select
          onChange={(value) => handleColorChange(value)}
          value={color}
          placeholder="Vui lòng chọn màu sắc">
          <Option value="" disabled >Vui lòng chọn</Option>
          {colors.length > 0 &&
            colors.map((cl) => (
              <Option key={cl._id} value={cl._id}>
                {cl.name}
              </Option>
            ))}
        </Select>
      </Form.Item>


      <Form.Item
        label="Thương hiệu"
        name="brand"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn chọn thương hiệu!",
          },
        ]}
      >
        <Select
          onChange={(value) => handleBrandChange(value)}
          value={brand}
          placeholder="Vui lòng chọn thương hiệu">
          <Option value="" disabled >Vui lòng chọn</Option>
          {brands.length > 0 &&
            brands.map((b) => (
              <Option key={b._id} value={b._id}>
                {b.name}
              </Option>
            ))}
        </Select>
      </Form.Item>


      <Form.Item
        label="Danh mục"
        name="category"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn chọn danh mục!",
          },
        ]}
      >
        <Select
          onChange={(value) => handleCatagoryChange(value)}
          value={category}
          placeholder="Vui lòng chọn danh mục"
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

      {showSub && (
        <div>
          <Form.Item
            label="Danh mục con"
            name="subs"
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn danh mục"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </div>
      )}
      <br />

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary ant-btn-lg ant-btn-hover">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductCreateForm;
