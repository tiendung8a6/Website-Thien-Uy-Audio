import React, { useState } from "react";
import { Card, Tooltip } from "antd";
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
import './productcardv2.css'
import Nike from './Nike.png'
import Paper from '@mui/material/Paper';
const { Meta } = Card;



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

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	// destructure
	const { images, title, description, slug, price } = product;
	return (
		<>


			{/* <Card
				cover={
					<img
						src={images && images.length ? images[0].url : laptop}
						style={{ height: "150px", objectFit: "cover" }}
						className="p-1"
					/>
				}
				actions={[
					<Link to={`/product/${slug}`}>
						<EyeOutlined className="text-warning" /> <br /> View Product
					</Link>,
					<Tooltip title={tooltip}>
						<a onClick={handleAddToCart} disabled={product.quantity < 1}>
							<ShoppingCartOutlined className="text-danger" /> <br />
							{product.quantity < 1 ? "Out of stock" : "Add to Cart"}
						</a>
					</Tooltip>,
				]}
			>
				<Meta
					title={`${title} - $${price}`}
					description={`${description && description.substring(0, 40)}...`}
				/>
			</Card> */}
			<div>
				<div className="card">
					<span className="like"><i className="bx bx-heart" /></span>
					<span className="cart"><i className="bx bx-cart-alt" /></span>
					<div className="card__img" elevation={3}>

						<img
							src="https://kibath.vn/wp-content/uploads/2023/07/guong-hinh-vuong-bo-4-goc-2.jpg"
							// style={{ height: "150px", objectFit: "cover" }}
							className="p-1 imgProductcardv2"
						/>
					</div>
					<h4 className="card__title">{title}</h4>
					<p className="card__price">
						{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)}
					</p>
					<div className="card__size" >
						{product && product.ratings && product.ratings.length > 0 ? (
							showAverage(product)
						) : (
							<div className="text-center pt-1 pb-3">No rating yet</div>
						)}
					</div>
					<Meta className="card_description"
						description={
							<Typography
								sx={{
									color: 'white',
									fontSize: '16px',
								}}
							>
								{description && `${description.substring(0, 20)}..... `}
								<Link to={`/product/${slug}`} style={{ color: 'white' }}> xem thêm</Link>
							</Typography>
						}
					/>
					<div className="card__action BottomCard">
						{/* <button className="button_productcardv2">Buy now</button>
						<button className="button_productcardv2">Add cart</button> */}
						<BottomNavigation
							showLabels

							style={{ width: '100%', backgroundColor: "transparent", marginTop: '20px' }}
						>
							<BottomNavigationAction component={Link} to={`/product/${slug}`} label="Xem" icon={<VisibilityOutlinedIcon className='hover_ProductCardIconv2'
							/>} />

							<BottomNavigationAction component={Link} onClick={handleAddToCart} label={product.quantity < 1 ? "Hết hàng" : "Còn hàng"} icon={<ShoppingCartOutlinedIcon className='hover_ProductCardIconv2' />} />
							<BottomNavigationAction component={Link} onClick={handleAddToWishlist} label="Lưu" icon={<HeartOutlined className='hover_ProductCardIconv2' />} />

						</BottomNavigation>
					</div>
				</div>
			</div >
		</>
	);
};

export default ProductCard;
