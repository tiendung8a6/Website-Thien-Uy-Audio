import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryUpdateForm from "../../../components/forms/CategoryUpdateForm";
import { message, notification } from 'antd';
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  name: "",
  images: [],
};
const CategoryUpdate = ({ history, match }) => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  // const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setValues({ ...values, ...c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, values, user.token)
      .then((res) => {
        setLoading(false);
        message.success(`Danh mục "${res.data.name}" đã được cập nhật thành công!`, 1, () => {
          window.location.reload();
        });
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400)
          notification.error({
            message: "Chỉnh sửa danh mục thất bại!",
            description:
              'Lỗi dự đoán: Danh mục đã tồn tại, Tên danh mục quá ngắn hoặc quá dài (Từ 4 đến 40 ký tự).',
          });
      });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Chỉnh sửa danh mục</h4>
          )}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <CategoryUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
          />

          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
