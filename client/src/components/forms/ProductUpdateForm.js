import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  handleColorChange,
  handleBrandChange,
  categories,
  colors,
  brands,
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
    // colors,
    // brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Mô tả cho sản phẩm</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Giá tiền</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Giao hàng</label>
        <select
          value={shipping === "Có" ? "Có" : "Không"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="Không">Không</option>
          <option value="Có">Có</option>
        </select>
      </div>

      <div className="form-group">
        <label>Số lượng</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Màu sắc</label>
        <select
          name="color"
          className="form-control"
          onChange={handleColorChange}
          value={values.color}
        >
          {colors.length > 0 &&
            colors.map((cl) => (
              <option key={cl.name} value={cl.name}>
                {cl.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Thương hiệu</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleBrandChange}
          value={values.brand}
        >
          {brands.length > 0 &&
            brands.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Danh mục</label>
        <select
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
        </select>
      </div>

      <div>
        <label>Danh mục con</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
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
        </Select>
      </div>

      <br />
      <button className="btn btn-outline-info">Lưu</button>
    </form>
  );
};

export default ProductUpdateForm;