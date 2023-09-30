import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";

export default function BlogCardv2({ blog }) {
    const { title, content, images, slug } = blog;
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={images && images.length ? images[0].url : laptop}

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}

                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography> */}
            </CardContent>
            <CardActions>
                <Link to={`/blog/${slug}`} >Xem thêm</Link>
            </CardActions>
        </Card>
    );
}