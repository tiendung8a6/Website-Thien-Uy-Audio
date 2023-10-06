import React, { useState, useEffect } from "react";
import Badge from '@mui/material/Badge';
import {
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getCategories, getCategorySubs } from "../../functions/category";
import SearchNav from "./Search";
import './header.css';

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      const firstThreeCategories = c.data.reverse();
      console.log(firstThreeCategories.slice(0, 3));
      setCategories(firstThreeCategories.slice(0, 3));
      setLoading(false);
    });
  }, []);


  const loadSubs = (category) => {
    getCategorySubs(category._id).then((res) => {
      const updatedCategories = categories.map((c) =>
        c._id === category._id ? { ...c, subs: res.data } : c
      );
      setCategories(updatedCategories);
    });
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
    window.location.reload();
  };

  const handleCategoryClick = (slug) => {
    history.push(`/category/${slug}`);
    window.location.reload();
  };

  return (
    <Navbar className="shadow-lg p-3 bg-body rounded p-3 mb-1" expand="lg">
      <Container style={{ fontSize: '18px', fontWeight: '900' }}>
        <Navbar.Brand as={Link} to="/">Navbar with text</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto d-flex ">
            <Nav.Link as={Link} to="/" onClick={() => setCurrent("home")} className=" ">
              Trang chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" className=" ">
              Giới thiệu
            </Nav.Link>

            {loading ? (
              <NavDropdown title="Loading..." id="basic-nav-dropdown" className="d-none" />
            ) : (
              categories.map((category) => (
                <NavDropdown key={category._id} title={category.name} id={`basic-nav-dropdown-${category._id}`} onMouseEnter={() => loadSubs(category)}>
                  {category.subs && category.subs.map((sub) => (
                    <NavDropdown.Item key={sub._id} onClick={() => handleCategoryClick(sub.slug)}>
                      {sub.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))
            )}

            <Nav.Link as={Link} to="/sendcontact" className=" ">
              Liên Hệ
            </Nav.Link>
          </Nav>

          <Nav className="">
            <SearchNav />
            <Nav.Link as={Link} to="/cart" onClick={() => setCurrent("cart")} className="d-flex align-items-center" style={{ fontSize: '18px', marginRight: '10px' }}>
              <ShoppingCartOutlined />
              <Badge badgeContent={cart.length} color="primary"  >
                <span style={{ fontSize: '18px' }}>Giỏ hàng</span>
              </Badge>
            </Nav.Link>

            {!user && (
              <>
                <Nav.Link as={Link} to="/register" className="d-flex align-items-center  ">
                  <UserAddOutlined /> Đăng kí
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="d-flex align-items-center ">
                  <UserOutlined /> Login
                </Nav.Link>
              </>
            )}

            {user && (
              <NavDropdown
                title={user.email && user.email.split("@")[0]}
                id="basic-nav-dropdown"
                className=""
              >
                {user && user.role === "subscriber" && (
                  <NavDropdown.Item as={Link} to="/user/history">
                    Dashboard
                  </NavDropdown.Item>
                )}

                {user && user.role === "admin" && (
                  <NavDropdown.Item as={Link} to="/admin/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item onClick={logout} className="d-flex align-items-center " >
                  <LogoutOutlined /> Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default Header;
