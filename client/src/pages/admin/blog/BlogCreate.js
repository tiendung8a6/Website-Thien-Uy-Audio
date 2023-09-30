import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createBlog } from "../../../functions/blog";
import BlogCreateForm from "../../../components/forms/BlogCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { message, notification } from 'antd';

const initialState = {
  title: "",
  content: "",
  description: "",
  images: [],
};

const BlogCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // Load cả cùng lúc
    Promise.all([])
      .then(([]) => {
        setValues({
          ...values
        });
      })
      .catch((error) => {
        console.error("Error loading: ", error);
      });
  }, []);


  const handleSubmit = () => {
    const updatedValues = {
      ...values,
    };

    console.log(updatedValues);

    createBlog(updatedValues, user.token)
      .then((res) => {
        console.log(res);
        message.success(`Blog "${res.data.title}" đã được tạo thành công!`, 1, () => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Thêm mới blog thất bại!",
          description: 'Lỗi dự đoán: Blog đã tồn tại.',
        });
      });
  };

  const handleChange = (fieldName, value) => {
    setValues({ ...values, [fieldName]: value });
    // console.log(e.target.name, " ----- ", e.target.value);
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
            <h4>Thêm mới blog</h4>
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

          <BlogCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCreate;
