import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getBrand, updateBrand } from "../../../functions/brand";
import BrandForm from "../../../components/forms/BrandForm";
import { message, notification } from 'antd';

const BrandUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = () =>
    getBrand(match.params.slug).then((b) => setName(b.data.name));

  const handleSubmit = (values) => {
    setLoading(true);
    updateBrand(match.params.slug, { name: values.name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        message.success(`Thương hiệu "${res.data.name}" đã được cập nhật thành công!`, 1, () => {
          window.location.reload();
        });
        history.push("/admin/brand");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400)
          notification.error({
            message: "Chỉnh sửa thương hiệu thất bại!",
            description:
              'Lỗi dự đoán: Thương hiệu đã tồn tại, Tên thương hiệu quá ngắn hoặc quá dài (Từ 4 đến 35 ký tự).',
          });
      });
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
            <h4>Chỉnh sửa thương hiệu</h4>
          )}

          <BrandForm
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

export default BrandUpdate;
