import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import { message, notification } from 'antd';

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (values) => {
    setLoading(true);
    updateCategory(match.params.slug, { name: values.name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
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
              'Lỗi dự đoán: Danh đã tồn tại, Tên danh mục quá ngắn hoặc quá dài (Từ 4 đến 40 ký tự).',
          });
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Chỉnh sửa danh mục</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
