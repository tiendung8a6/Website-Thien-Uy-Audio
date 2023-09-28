import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminBlogCard = ({ blog, handleRemove }) => {
  // destructure
  const { title, content, images, slug } = blog;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        // <Link to={`/admin/blog/${slug}`}>
        //   <EditOutlined className="text-warning" />
        // </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        content={content}
        // content={`${content && content.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminBlogCard;
