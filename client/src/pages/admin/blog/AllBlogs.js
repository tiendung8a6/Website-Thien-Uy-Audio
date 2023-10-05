import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getBlogsByCount } from "../../../functions/blog";
import AdminBlogCard from "../../../components/cards/AdminBlogCard";
import { removeBlog } from "../../../functions/blog";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Pagination, Input, Result, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Search } = Input;

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6); // Số sản phẩm trên mỗi trang
  const [searchKeyword, setSearchKeyword] = useState(""); // State để lưu từ khoá tìm kiếm
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllBlogs();
  }, []);

  const loadAllBlogs = () => {
    setLoading(true);
    getBlogsByCount(100)
      .then((res) => {
        console.log(res.data); // Add this line to check the API response
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("Delete?")) {
      removeBlog(slug, user.token)
        .then((res) => {
          loadAllBlogs();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setBlogsPerPage(size);
    setCurrentPage(1); // Reset trang về trang đầu khi thay đổi số lượng sản phẩm trên mỗi trang
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  const handleResetSearch = () => {
    setSearchKeyword(""); // Xóa dữ liệu trong khung tìm kiếm
    loadAllBlogs();
  };

  // Lọc sản phẩm dựa trên từ khoá tìm kiếm
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <div>
              <h4>Danh sách blog</h4>
              <div className="d-flex  align-items-center">
                <p style={{ fontSize: '16px', marginTop: '15px' }} > <span style={{ fontSize: '18px', marginRight: '3px' }}> <ShoppingCartOutlined /> </span>Tổng số bài blog: <span style={{ fontWeight: 700, marginLeft: '2px' }}>{filteredBlogs.length}</span></p>
                <Search
                  placeholder="Tìm kiếm blog"
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: 230, marginLeft: '23px' }}
                  enterButton
                />
              </div>
              <div className="row">
                {currentBlogs.length === 0 ? (
                  <div className="col">
                    <Result
                      status="404"
                      title="Không tìm thấy blog"
                      subTitle="Xin lỗi, không có blog nào phù hợp với tìm kiếm của bạn."
                      extra={<Button type="primary" onClick={handleResetSearch}>Thử lại</Button>}
                    />

                  </div>
                ) : (
                  currentBlogs.map((blog) => (
                    <div key={blog._id} className="col-md-4 pb-3">
                      <AdminBlogCard blog={blog} handleRemove={handleRemove} />
                    </div>
                  ))
                )}

              </div>

              <Pagination
                current={currentPage}
                total={filteredBlogs.length}
                pageSize={blogsPerPage}
                onChange={handleChangePage}
                showSizeChanger
                onShowSizeChange={handlePageSizeChange}
                pageSizeOptions={['6', '9', '18', '33', '48']} // Các tùy chọn số lượng sản phẩm trên mỗi trang
                showQuickJumper
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} // Hiển thị thông tin số sản phẩm
                showLessItems // Hiển thị ít tùy chọn hơn khi có nhiều sản phẩm
                size="small" // Cỡ nhỏ cho Pagination
                style={{ textAlign: 'center' }} // Căn giữa Pagination
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
