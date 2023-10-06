import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { getBlog } from "../functions/blog";
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Logo from '../images/Logo.png';
import { deepOrange } from '@mui/material/colors';
import Grid from '@mui/material/Unstable_Grid2';
import Jumbotron from "../components/cards/Jumbotron";

const convertUTCToLocal = (utcString) => {
  const date = new Date(utcString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  };

  return new Intl.DateTimeFormat('vi-VN', options).format(date);
};

const Blog = ({ match }) => {
  const [blog, setBlog] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadSingleBlog();
  }, [slug]);

  const loadSingleBlog = () => {
    getBlog(slug).then((res) => {
      setBlog(res.data);
=======
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
>>>>>>> f043826da833dc37df6e148de07d4a3dedf91f10
    });
  };

  return (
    <div className="container-fluid">
<<<<<<< HEAD
      <Paper elevation={3} style={{ padding: '50px', margin: '50px 200px' }} sx={{ borderRadius: '16px' }}>
        <div>
          <h1 style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}><Jumbotron text={blog.title} /></h1>
          <Grid container spacing={2}>
            <Grid item xs={1} sx={{ borderRadius: '16px' }}>
              <Avatar src={Logo} sx={{ bgcolor: deepOrange[500], width: 60, height: 60 }}></Avatar>
            </Grid>
            <div className="mt-1">
              <h3 style={{ marginTop: '5px' }}>Admin</h3>
              <div style={{ marginTop: '-10px' }}>{convertUTCToLocal(blog.createdAt)}</div>
            </div>
          </Grid>
          <Paper dangerouslySetInnerHTML={{ __html: blog.content }} elevation={2} style={{ marginTop: '50px', padding: '20px' }} />
        </div>
      </Paper>
=======
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
>>>>>>> f043826da833dc37df6e148de07d4a3dedf91f10
    </div>
  );
};

<<<<<<< HEAD
export default Blog;
=======
export default Product;
>>>>>>> f043826da833dc37df6e148de07d4a3dedf91f10
