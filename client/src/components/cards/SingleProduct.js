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
              {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          ) : (
            <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
          )}
        </Paper>
        <Paper style={{ height: '200px', marginTop: '10px' }}>
          <Tabs type="card" >

            <TabPane tab="Mô tả SP" key="1">
              {description && description}
            </TabPane>
            <TabPane tab="Thông tin chi tiết" key="2">
              Liên hệ ngay: ................
            </TabPane>

          </Tabs>
        </Paper >
      </div>

      <Paper className="col-md-5" elevation={3}>
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
                <div className="text-center pt-1 pb-3">Chưa có đánh giá</div>
              )}

              <Card style={{ marginBottom: '10px' }}
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
    </>
  );
};

export default SingleProduct;
