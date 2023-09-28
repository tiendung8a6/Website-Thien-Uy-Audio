import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import ProductCard from "../../../components/cards/ProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Pagination, Input, Result, Button } from 'antd';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const { Search } = Input;

const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(6); // Số sản phẩm trên mỗi trang
    const [searchKeyword, setSearchKeyword] = useState(""); // State để lưu từ khoá tìm kiếm
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleRemove = (slug) => {
        if (window.confirm("Delete?")) {
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
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
        setProductsPerPage(size);
        setCurrentPage(1); // Reset trang về trang đầu khi thay đổi số lượng sản phẩm trên mỗi trang
    };

    const handleSearch = (value) => {
        setSearchKeyword(value);
    };

    const handleResetSearch = () => {
        setSearchKeyword(""); // Xóa dữ liệu trong khung tìm kiếm
        loadAllProducts();
    };


    // Lọc sản phẩm dựa trên từ khoá tìm kiếm
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <div>
                            <h4>Danh sách sản phẩm</h4>
                            <div className="d-flex  align-items-center justify-content-between">
                                <p style={{ fontSize: '16px', marginTop: '15px' }} > <span style={{ fontSize: '18px', marginRight: '3px', marginTop: '100px' }}> <ShoppingCartIcon /> </span>Tổng số sản phẩm: <span style={{ fontWeight: 700, marginLeft: '2px' }}>{filteredProducts.length}</span></p>
                                <Search
                                    placeholder="Tìm kiếm sản phẩm"
                                    onChange={(e) => handleSearch(e.target.value)}
                                    style={{ width: 230, marginLeft: '23px' }}
                                    enterButton
                                />
                            </div>
                            <div className="row">
                                {currentProducts.length === 0 ? (
                                    <div className="col">
                                        <Result
                                            status="404"
                                            title="Không tìm thấy sản phẩm"
                                            subTitle="Xin lỗi, không có sản phẩm nào phù hợp với tìm kiếm của bạn."
                                            extra={<Button type="primary" onClick={handleResetSearch}>Thử lại</Button>}
                                        />
                                    </div>
                                ) : (
                                    currentProducts.map((product) => (
                                        <div key={product._id} className="col-md-6 pb-3"> {/* Thay đổi col-md-4 thành col-md-6 */}
                                            <ProductCard product={product} handleRemove={handleRemove} />
                                        </div>
                                    ))
                                )}
                            </div>

                            <Pagination
                                simple
                                current={currentPage}
                                total={filteredProducts.length}
                                pageSize={productsPerPage}
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

export default SearchProduct;
