import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  const { title, images, description, _id } = product;

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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7" >
        <Paper >
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images && images.map((i) => <img src={i.url} key={i.public_id} style={{ height: '100%', backgroundSize: 'cover', }} />)}
            </Carousel>
          ) : (
            <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
          )}
        </Paper>
        {/* absolutes */}
      </div>

      <Paper className="col-md-5" elevation={3} style={{ marginBottom: '20px' }}>
        <TableContainer >
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><h1 style={{ textAlign: 'center' }}>{title}</h1></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
              ) : (
                <div className="text-center pt-1 pb-1">Chưa có đánh giá</div>
              )}

              <Card style={{ marginBottom: '' }}
                actions={[
                  <Tooltip placement="top" title={tooltip}>
                    <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                      <ShoppingCartOutlined className="text-danger" />
                      <br />
                      {product.quantity < 1 ? "Hết hàng" : "Thêm vào giỏ hàng"}
                    </a>
                  </Tooltip>,
                  <a onClick={handleAddToWishlist}>
                    <HeartOutlined className="text-info" /> <br /> Thêm vào ds yêu thích

                  </a>,
                  <RatingModal>
                    <StarRating
                      name={_id}
                      numberOfStars={5}
                      rating={star}
                      changeRating={onStarClick}
                      isSelectable={true}
                      starRatedColor="red"
                    />
                  </RatingModal>,
                ]}
              >

                <ProductListItems product={product} />
              </Card>
            </TableBody>
          </Table>
        </TableContainer>




      </Paper>


      <Tabs type="card" style={{ marginTop: '10px' }}>
        {/* <TabPane tab="Thông tin liên hệ " key="1" style={{ padding: '10px' }}>
          Liên hệ ngay:<br />

          <ul>
            <li><a href="tel:079 2826 567" target="_blank">079 2826 567</a><br /></li>
            <li><a href="https://www.google.com/maps/place/L%C3%B4+1,+Ph%C6%B0%E1%BB%9Dng+27,+B%C3%ACnh+Th%E1%BA%A1nh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.8186847,106.7134828,17z/data=!3m1!4b1!4m6!3m5!1s0x3175289b0ccf1e47:0x245a22fc48e9a457!8m2!3d10.8186794!4d106.7160577!16s%2Fg%2F12jvylqkp?hl=vi-VN&entry=ttu" target="_blank">Cư xá Thanh Đa Lô 1 Phường 27 Bình Thạnh  </a> <br /></li>
            <li><a href="mailto:thienuyaudio@gmail.com" target="_blank">Email </a> <br /></li>
            <li><a href="https://www.facebook.com/thietkedankaraoke" target="_blank">Fanpage </a><br /></li>



          </ul>
        </TabPane> */}
        <TabPane tab="Mô tả SP" key="1">

          <Paper elevation={2} style={{ overflow: 'scroll', padding: '30px' }}>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
            <style>
              {`
                img {
                  height: 400px;
                  width: auto;

                }
              `}
            </style>
          </Paper>
        </TabPane>


      </Tabs>

    </>
  );
};

export default SingleProduct;
