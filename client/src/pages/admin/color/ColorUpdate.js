import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getColor, updateColor } from "../../../functions/color";
import ColorForm from "../../../components/forms/ColorForm";
import { message, notification } from 'antd';

const ColorUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadColor();
  }, []);

  const loadColor = () =>
    getColor(match.params.slug).then((cl) => setName(cl.data.name));

  const handleSubmit = (values) => {
    setLoading(true);
    updateColor(match.params.slug, { name: values.name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        message.success(`Màu "${res.data.name}" đã được cập nhật thành công!`, 1, () => {
          window.location.reload();
        });
        history.push("/admin/color");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400)
          notification.error({
            message: "Chỉnh sửa màu thất bại!",
            description:
              'Lỗi dự đoán: Màu đã tồn tại, Màu quá ngắn hoặc quá dài (Từ 1 đến 35 ký tự).',
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
            <h4>Chỉnh sửa màu sắc</h4>
          )}

          <ColorForm
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

export default ColorUpdate;
