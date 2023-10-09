import * as React from 'react';
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
import { red } from '@mui/material/colors';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';

import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import Logo from '../../images/Logo.png';

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
const convertUTCToLocal = (utcString) => {
    const date = new Date(utcString);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Hiển thị theo định dạng 24 giờ
        timeZone: 'Asia/Ho_Chi_Minh', // Múi giờ Việt Nam
    };

    return new Intl.DateTimeFormat('vi-VN', options).format(date);
};
export default function BlogCardv2({ blog }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { title, content, images, slug, description, createdAt } = blog;
    return (
        <Card sx={{ Width: 345, Minheight: 350 }} >
            <CardHeader
                avatar={
                    <Avatar src={Logo} sx={{ width: 40, height: 40, }}></Avatar>
                }

                title="Admin thân bút"
                subheader={convertUTCToLocal(createdAt)}
            />
            <CardMedia
                component="img"
                height="194"
                width="200"
                image={images && images.length ? images[0].url : laptop}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {title.length > 40 ? `${title.substring(0, 35)}...` : title}
                </Typography>
            </CardContent>


            <BottomNavigation showLabels >
                <BottomNavigationAction component={Link} to={`/blog/${slug}`} label="Xem blog" icon={<VisibilityIcon />} />
                <BottomNavigationAction expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more" label="Thêm" icon={<ExpandMoreIcon />} />
            </BottomNavigation>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent >
                    <Typography paragraph>Mô tả:</Typography>

                    <Typography paragraph>
                        <Typography paragraph style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: description }} />
                    </Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}