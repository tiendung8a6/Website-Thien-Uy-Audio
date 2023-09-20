import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue } from '@mui/material/colors';

// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import HeartOutlined from '@mui/icons-material/FavoriteBorder';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import { addToWishlist } from "../../functions/user";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
const { Meta } = Card;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

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

  let history = useHistory();
  // const handleAddToWishlist = (e) => {
  //   e.preventDefault();
  //   addToWishlist(product._id, user.token).then((res) => {
  //     console.log("ADDED TO WISHLIST", res.data);
  //     toast.success("Added to wishlist");
  //     history.push("/user/wishlist");
  //   });
  // };

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
  const [errorMessage, setErrorMessage] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { images, title, description, slug, price } = product;

  return (
    <>

      {errorMessage && (
        <div style={{ position: 'relative' }}>
          <Stack sx={{ width: '100%' }} spacing={2} style={{ position: 'fixed', bottom: '10px', left: '10px', width: '30%', zIndex: '10' }}>
            <Alert severity="error" >
              <AlertTitle>Lỗi</AlertTitle>
              {errorMessage}
              <br />
              <Link to='/login'>Đăng nhập ngay </Link>
            </Alert>
          </Stack>


        </div>
      )}
      <Card sx={{ Width: 300 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              AD
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }


        // title={product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <span className='d-flex justify-content-center'> Chưa có  giá</span>}

        />
        <CardMedia
          component="img"
          height="150" // Adjust the height as needed
          src={images && images.length ? images[0].url : laptop}
          alt="Product Image"
          style={{ objectFit: "cover" }}
          className="p-1"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <span style={{ color: '#87CEEB', fontSize: '16px' }}>{`${title}`}</span>

            <br />
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)}
            {/* {`${price}`}vnđ */}

            <span className='d-flex justify-content-start'>
              {product && product.ratings && product.ratings.length > 0 ? showAverage(product) :
                <p className='mb-4'> Chưa có  giá</p>}
            </span>

          </Typography>
        </CardContent>
        <hr />
        <CardActions disableSpacing>

          <Container>
            <Row className='d-flex justify-content-center' xs={3} md={1} lg={4} >

              <Col>
                <Link to={`/product/${slug}`}>
                  <VisibilityOutlinedIcon className='d-flex m-auto' />
                  <span style={{ color: '#333' }} className='d-flex justify-content-center'> </span>
                </Link>
              </Col>



              <Col md="auto">
                <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                  <ShoppingCartOutlinedIcon className="text-danger d-flex m-auto" />
                  <span style={{ color: '#333' }} className='d-flex justify-content-center'>
                    {product.quantity < 1 ? "Hết hàng" : ""}
                  </span>

                </a>
              </Col>
              <Col>
                <a onClick={handleAddToWishlist}>
                  <HeartOutlined className="text-info text-primary d-flex m-auto" />
                </a>,
              </Col>

              <Col lg="2" style={{ marginTop: '-7px', }}>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  className='d-flex justify-content-center mx-auto'

                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Col>
            </Row>
          </Container>







        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Mô tả sản phẩn:</Typography>

            <Typography paragraph>
              {description}
            </Typography>


          </CardContent>
        </Collapse>
      </Card>
      <br></br>
    </>
  );
};

export default ProductCard;
