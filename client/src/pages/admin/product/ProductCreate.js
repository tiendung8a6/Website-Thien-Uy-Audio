import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getBrands } from "../../../functions/brand";
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
  images: [
    // {
    //   public_id: "jwrzeubemmypod99e8lz",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
    // },
    // {
    //   public_id: "j7uerlvhog1eic0oyize",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480912/j7uerlvhog1eic0oyize.jpg",
    // },
    // {
    //   public_id: "ho6wnp7sugyemnmtoogf",
    //   url:
    //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480913/ho6wnp7sugyemnmtoogf.jpg",
    // },
  ],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: [],
  brand: "",
  color: "",
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
    Promise.all([getCategories(), getBrands()])
      .then(([categoriesResponse, brandsResponse]) => {
        setValues({
          ...values,
          categories: categoriesResponse.data,
          brands: brandsResponse.data,
        });
      })
      .catch((error) => {
        console.error("Error loading categories and brands: ", error);
      });
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const loadBrands = () =>
    getBrands().then((b) => setValues({ ...values, brands: b.data }));

    const handleSubmit = () => {
      // Trước khi tạo sản phẩm, tìm tên thương hiệu dựa trên id thương hiệu đã chọn
      const selectedBrand = values.brands.find((b) => b._id === values.brand);
    
      // Tạo một object mới với trường brand là name của thương hiệu đã chọn
      const updatedValues = {
        ...values,
        brand: selectedBrand ? selectedBrand.name : "",
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
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
