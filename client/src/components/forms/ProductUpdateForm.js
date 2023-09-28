import React from "react";
import { Select } from "antd";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto ' }}>
      <InputGroup hasValidation>
        <InputGroup.Text>Tên sản phẩm</InputGroup.Text>
        <Form.Control
          required
          isValid={title ? true : false} // Set isValid to true if title is empty
          isInvalid={title ? false : true}
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
        <br />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập tên sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>
      </InputGroup>


      <InputGroup hasValidation>
        <InputGroup.Text>Mô tả sản phẩm</InputGroup.Text>

        <Form.Control
          type="text"
          required
          isValid={description ? true : false}
          isInvalid={description ? false : true}
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
          as="textarea"
          style={{ height: '38px' }}
        />
        <br />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập mô tả sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup hasValidation >
        <InputGroup.Text>$Giá</InputGroup.Text>

        <Form.Control
          type="number"
          isValid={price ? true : false}
          isInvalid={price ? false : true}
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}

        />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập giá tiền sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup hasValidation >
        <InputGroup.Text>Giao hàng</InputGroup.Text>
        <Form.Select
          isValid={shipping ? true : false}
          isInvalid={shipping ? false : true}
          value={shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          Vui lòng chọn phương thức giao hàng  sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup hasValidation >
        <InputGroup.Text>Số lượng</InputGroup.Text>

        <Form.Control
          isValid={quantity ? true : false}
          isInvalid={quantity ? false : true}
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập số lượng sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>

      </InputGroup>

      <InputGroup hasValidation>
        <InputGroup.Text>Màu sắc</InputGroup.Text>
        <Form.Select
          isValid={color ? true : false}
          isInvalid={color ? false : true}
          value={color}
          name="color"
          className="form-control"
          onChange={handleChange}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Form.Select>
        <br></br>
        <Form.Control.Feedback type="invalid">
          Vui lòng chọn màu sắc sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup hasValidation>
        <InputGroup.Text>Thương hiệu</InputGroup.Text>
        <Form.Select
          isValid={brand ? true : false}
          isInvalid={brand ? false : true}

          type="text"
          value={brand}
          name="brand"
          className="form-control"
          onChange={handleChange}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Vui lòng chọn thương hiệu sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup hasValidation>
        <InputGroup.Text>Danh mục</InputGroup.Text>
        <Form.Select
          isValid={category ? true : false}
          isInvalid={category ? false : true}
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Vui lòng chọn danh mục sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup hasValidation>
        <InputGroup.Text>Danh mục con</InputGroup.Text>
        <Form.Select
          mode="multiple"
          // style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Vui lòng chọn danh mục con sản phẩm
        </Form.Control.Feedback>

        <Form.Control.Feedback type="valid">
          Ok được đấy chứ
        </Form.Control.Feedback>

      </InputGroup>

      <br />
      <button className="btn btn-outline-info" type="submit">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
