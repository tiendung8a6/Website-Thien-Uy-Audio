import React from "react";
import Slider from "react-slick";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './RegisterNew.css'
export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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

    const imageLogoBard = [
        {
            image: 'https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$',
            name: 'Sam Sung',
        },
        {
            image: 'https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$',
            name: 'Sam Sung',
        },
        {
            image: 'https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$',
            name: 'Sam Sung',
        },
        {
            image: 'https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$',
            name: 'Sam Sung',
        },
        {
            image: 'https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$',
            name: 'Sam Sung',
        },
        {
            image: 'https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$',
            name: 'Sam Sung',
        },
        {
            image: 'https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$',
            name: 'Sam Sung',
        }

    ]
    return (
        <Slider {...settings} autoplay pauseOnFocus className="d-flex " style={{ margin: '30px' }}>
            {imageLogoBard.map(el => (
                <div className="d-flex justify-content-center mb-2" style={{ width: '100%' }} key={el.name}>
                    <Card sx={{}} style={{ width: '300px' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={el.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" className="d-flex justify-content-center">
                                    {el.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </div>
            ))}
        </Slider>
    );
}