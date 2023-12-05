import React, { useState } from "react";

import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../../images/laptop.png";
import { Link, useHistory } from "react-router-dom";
import { showAverage } from "../../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../../functions/user";
import { toast } from "react-toastify";
// import {  } from "react-router-dom
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import HeartOutlined from '@mui/icons-material/FavoriteBorder';
import './productcardv3.css'




const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState("Click to add");
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    const [expanded, setExpanded] = React.useState(false);
    // redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const handleAddToWishlist = (e) => {
        e.preventDefault();
        try {
            addToWishlist(product._id, user.token).then((res) => {
                console.log("ADDED TO WISHLIST", res.data);
                toast.success("Added to wishlist");
                history.push("/user/wishlist");
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // yêu cầu đăng nhập
                window.alert("Vui Long đăng nhập");
                // Có thể thêm chuyển hướng đến trang đăng nhập ở đây
            } else {
                // Xử lý lỗi khác nếu cần
                // window.alert("Vui Long đăng nhập");
                setErrorMessage("Qúy khách vui lòng đăng nhập");

            }
        }
    };

    const handleAddToCart = () => {
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            // save to local storage
            // console.log('unique', unique)
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");

            // add to reeux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    // destructure
    const { images, title, description, slug, price, status, Guarantee, Origin } = product;


    console.log("Status:", product.status);

    console.log("Guarantee:", product.Guarantee);
    console.log("Origin:", product.Origin);
    return (
        <>



            <div >
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src={images && images.length ? images[0].url : laptop} className="flip-card_img" />
                            <p class="title">{title}</p>
                            <p class="title">
                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)}
                            </p>


                        </div>
                        <div class="flip-card-back">
                            {product && product.ratings && product.ratings.length > 0 ? (
                                showAverage(product)
                            ) : (
                                <div className="text-center pt-1 pb-3" style={{ fontSize: '24px' }}>Chưa có đánh giá</div>
                            )}
                            <p class="title">{product.status}</p>
                            <p class="title">{Guarantee}</p>
                            <p class="title">{Origin}</p>

                            <div className="flip-card_bottom">

                                <BottomNavigation
                                    showLabels

                                    style={{ width: '100%', backgroundColor: "transparent", marginTop: '20px' }}

                                >
                                    <BottomNavigationAction style={{ color: 'white' }} component={Link} to={`/product/${slug}`} label="Xem" icon={<VisibilityOutlinedIcon style={{ color: 'white' }} className='hover_ProductCardIconv2'
                                    />} />

                                    <BottomNavigationAction style={{ color: 'white' }} component={Link} onClick={handleAddToCart} label={product.quantity < 1 ? "Hết hàng" : "Còn hàng"} icon={<ShoppingCartOutlinedIcon style={{ color: 'white' }} className='hover_ProductCardIconv2' />} />
                                    <BottomNavigationAction style={{ color: 'white' }} component={Link} onClick={handleAddToWishlist} label="Lưu" icon={<HeartOutlined style={{ color: 'white' }} className='hover_ProductCardIconv2' />} />

                                </BottomNavigation>
                            </div>
                        </div>
                    </div>
                </div>




            </div >
        </>
    );
};

export default ProductCard;
