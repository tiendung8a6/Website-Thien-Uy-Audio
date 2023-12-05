import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getBrands } from "../../../functions/brand";
import { getColors } from "../../../functions/color";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { message, notification } from 'antd';

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: [],
  brands: [],
  brand: "",
  color: "",
  status: "",
  Guarantee: "",
  Origin: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // Load cả danh mục và thương hiệu cùng lúc
    Promise.all([getCategories(), getBrands(), getColors()])
      .then(([categoriesResponse, brandsResponse, colorsResponse]) => {
        setValues({
          ...values,
          categories: categoriesResponse.data,
          brands: brandsResponse.data,
          colors: colorsResponse.data,
        });
      })
      .catch((error) => {
        console.error("Error loading categories, brands, colors : ", error);
      });
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const loadBrands = () =>
    getBrands().then((b) => setValues({ ...values, brands: b.data }));

  const loadColors = () =>
    getColors().then((cl) => setValues({ ...values, colors: cl.data }));


  const handleSubmit = () => {
    // Trước khi tạo sản phẩm, tìm tên thương hiệu dựa trên id thương hiệu đã chọn
    const selectedBrand = values.brands.find((b) => b._id === values.brand);
    const selectedColor = values.colors.find((cl) => cl._id === values.color);

    // Tạo một object mới với trường brand là name của thương hiệu đã chọn
    const updatedValues = {
      ...values,
      brand: selectedBrand ? selectedBrand.name : "",
      color: selectedColor ? selectedColor.name : "",
    };

    createProduct(updatedValues, user.token)
      .then((res) => {
        console.log(res);
        message.success(`Sản phẩm "${res.data.title}" đã được tạo thành công!`, 1, () => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Thêm mới sản phẩm thất bại!",
          description: 'Lỗi dự đoán: Sản phẩm đã tồn tại.',

        });
      });
  };

  const handleChange = (fieldName, value) => {
    setValues({ ...values, [fieldName]: value });

    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (value) => {
    console.log("SELECTED CATEGORY", value);
    setValues({ ...values, subs: [], category: value });
    getCategorySubs(value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  const handleBrandChange = (value) => {
    console.log("SELECTED BRAND", value);
    setValues({ ...values, brand: value });
  };

  const handleColorChange = (value) => {
    console.log("SELECTED COLOR", value);
    setValues({ ...values, color: value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Thêm mới sản phẩm</h4>
          )}
          <hr />

          {/* {JSON.stringify(values.images)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            handleBrandChange={handleBrandChange}
            handleColorChange={handleColorChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
