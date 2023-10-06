import React, { useEffect, useState } from "react";
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
    });
  };

  return (
    <div className="container-fluid">
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
    </div>
  );
};

export default Blog;
