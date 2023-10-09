import React, { useEffect, useState } from "react";

import { getBlogsByCount } from "../../functions/blog";
import BlogCardv2 from "../home/BlogCardV2"
// import AdminBlogCard from "../../../components/cards/AdminBlogCard";
import { removeBlog } from "../../functions/blog";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Pagination, Input, Result, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Carousel from "../../components/Carousel/Carrousel"
import Footer from "../footer/Footer";
import BookIcon from '@mui/icons-material/Book';
import './allbloguser.css'
const { Search } = Input;


const AllBloguser = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage, setBlogsPerPage] = useState(9); // Số sản phẩm trên mỗi trang
    const [searchKeyword, setSearchKeyword] = useState(""); // State để lưu từ khoá tìm kiếm
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllBlogs();
    }, []);

    const loadAllBlogs = () => {
        setLoading(true);
        getBlogsByCount(100)
            .then((res) => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                // console.log(err);
            });
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
        < >

            <Carousel></Carousel>
            <div >
                {loading ? (
                    <h4 className="text-danger">Loading...</h4>
                ) : (
                    <div>

                        <h1 className="text-center   mb-5 display-4 jumbotron">
                            Danh sách blog
                        </h1>
                        <div className="d-flex  align-items-center mx-3" style={{ justifyContent: "space-between" }}>
                            <p style={{ fontSize: '16px', marginTop: '15px' }} >  <BookIcon /> Tổng số bài blog: <span style={{ fontWeight: 700, marginLeft: '2px' }}>{filteredBlogs.length}</span></p>
                            <Search
                                placeholder="Tìm kiếm blog"
                                onChange={(e) => handleSearch(e.target.value)}
                                style={{ width: 230, marginLeft: '23px' }}
                                enterButton
                            />
                        </div>
                        <div className="row mx-auto">
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

                                <Box sx={{ width: '100%', padding: "20px 30px" }} >
                                    <Grid container rowSpacing={20} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }} elevation={3}>
                                        {currentBlogs.map((blog) => (
                                            <Grid item xs={6} sm={6} md={4} lg={4} key={blog._id} >
                                                <Paper elevation={3} className="hovercardblogv2">
                                                    <BlogCardv2 blog={blog} />
                                                </Paper>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Box>
                            )}

                        </div>

                        <Pagination
                            simple
                            current={currentPage}
                            total={filteredBlogs.length}
                            pageSize={blogsPerPage}
                            onChange={handleChangePage}
                            showSizeChanger
                            onShowSizeChange={handlePageSizeChange}
                            pageSizeOptions={['3', '9', '18', '33', '48']} // Các tùy chọn số lượng sản phẩm trên mỗi trang
                            showQuickJumper
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} // Hiển thị thông tin số sản phẩm
                            showLessItems // Hiển thị ít tùy chọn hơn khi có nhiều sản phẩm
                            size="small" // Cỡ nhỏ cho Pagination
                            style={{ textAlign: 'center', marginTop: '10px' }} // Căn giữa Pagination
                        />
                    </div>
                )}
            </div>
            <Footer ></Footer>
        </>
    );
};

export default AllBloguser;
