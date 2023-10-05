import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

import Slider from "react-slick";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },

      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },

      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const showCategories = () =>

    <>
      <Slider {...settings} autoplay pauseOnFocus className="d-flex " style={{ margin: '30px', color: 'black' }}>
        {categories.map((c) => (
          <div className="d-flex justify-content-center mb-2" style={{ width: '100%' }} key={c._id}>
            <Card sx={{}} style={{ width: '300px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  // image={el.image}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9AGYk9EQ3-c4d_TAsmVmQ6jw3ffGkZpTjg&usqp=CAU"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className="d-flex justify-content-center">
                    <Link to={`/category/${c.slug}`} style={{ color: 'black' }}>{c.name}</Link>
                  </Typography>
                </CardContent>
              </CardActionArea>

            </Card>
          </div>
        ))}
      </Slider>
    </>

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
