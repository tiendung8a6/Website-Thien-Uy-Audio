import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import MoneyIcon from '@mui/icons-material/Money';
import PasswordIcon from '@mui/icons-material/Password';
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import ColorLensSharpIcon from '@mui/icons-material/ColorLensSharp';
import NewspaperSharpIcon from '@mui/icons-material/NewspaperSharp';
import FiberNewSharpIcon from '@mui/icons-material/FiberNewSharp';

import './header.css';
const AdminNav = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const navItems = [

    { text: "Thêm sản phẩm", path: "/admin/product", icon: <AddBoxIcon /> },
    { text: "Danh sách sản phẩm", path: "/admin/products", icon: <ListIcon /> },
    { text: "Quản lý danh mục", path: "/admin/category", icon: <CategoryIcon /> },
    { text: "Quản lý danh mục con", path: "/admin/sub", icon: <ClassIcon /> },
    { text: "Quản lý thương hiệu", path: "/admin/brand", icon: <LocalOfferSharpIcon /> },
    { text: "Quản lý màu sắc", path: "/admin/color", icon: <ColorLensSharpIcon /> },
    { text: "Quản lý Coupon", path: "/admin/coupon", icon: <MoneyIcon /> },
    { text: "Tạo blog", path: "/admin/blog", icon: <FiberNewSharpIcon /> },
    { text: "Danh sách blog", path: "/admin/blogs", icon: <NewspaperSharpIcon /> },
    { text: "Đổi mật khẩu", path: "/user/password", icon: <PasswordIcon /> },
    { text: "Trang chủ", path: "/admin/dashboard", icon: <DashboardIcon /> },

  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 260, bgcolor: '', color: 'text.primary' }} >
      <List component="nav" aria-label="main mailbox folders " >
        {navItems.map((item, index) => (
          <ListItemButton
            component={Link}
            to={item.path}
            key={index}
            className='my-4  '
            //style={{
            //  backgroundColor: selectedIndex === index ? '#007bff' : 'initial',
            // color: selectedIndex === index ? '#fff' : 'initial',
            // }}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>

        ))}


      </List>

    </Box>
  );
}

export default AdminNav;
