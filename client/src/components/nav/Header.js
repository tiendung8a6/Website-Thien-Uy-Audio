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
import Logo from '../../images/Logo.png';
import Avatar from '@mui/material/Avatar';

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
    history.push(`/category/subs/${slug}`);
    window.location.reload();
  };

  const handlLoginReloadPage = () => {
    history.push('/login');

    window.location.reload();
  }
  const handlRegisterReloadPage = () => {
    history.push('/register');

    window.location.reload();
  }
  return (
    <div style={{ fontSize: '18px', fontWeight: '800', }}>
      <Navbar menuVariant="dark" className="" expand="lg" >
        <Container style={{ fontSize: '18px', fontWeight: '800', }}>
          <Navbar.Brand as={Link} to="/">
            {/* <img  style={{ width: '50px', height: 'auto', borderRadius: '50%' }}></img> */}
            <Avatar
              alt="Logo HUNGUY"
              src={Logo}
              sx={{ width: 45, height: 45, }}

            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto d-flex " style={{ color: 'black' }}>
              <Nav.Link as={Link} to="/" onClick={() => setCurrent("home")} className=" " style={{ color: 'black' }}>
                Trang chủ
              </Nav.Link>
              <Nav.Link as={Link} to="/blog" className=" " style={{ color: 'black' }}>
                Giới thiệu
              </Nav.Link>

              {loading ? (
                <NavDropdown title="Loading..." id="basic-nav-dropdown" className="d-none" style={{ color: 'black' }} />
              ) : (
                categories.map((category) => (
                  <NavDropdown key={category._id} title={
                    <span className="" style={{ color: 'black' }}>{category.name}</span>
                  }
                    id={`basic-nav-dropdown-${category._id}`} onMouseEnter={() => loadSubs(category)} >
                    {category.subs && category.subs.map((sub) => (
                      <NavDropdown.Item key={sub._id} onClick={() => handleCategoryClick(sub.slug)} >

                        <span style={{ color: 'black' }}> {sub.name}</span>
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ))
              )}

              <Nav.Link as={Link} to="/sendcontact" className=" " style={{ color: 'black' }}>
                Liên Hệ
              </Nav.Link>
            </Nav>

            <Nav className="" style={{ color: 'black' }}>
              <SearchNav />
              <Nav.Link as={Link} to="/cart" onClick={() => setCurrent("cart")} className="d-flex align-items-center" style={{ fontSize: '18px', marginRight: '10px' }}>
                <ShoppingCartOutlined />
                <Badge badgeContent={cart.length} color="primary"  >
                  <span style={{ fontSize: '18px', color: 'black' }}>Giỏ hàng</span>
                </Badge>
              </Nav.Link>

              {!user && (
                <>
                  {/* <Nav.Link as={Link} onClick={handlRegisterReloadPage} className="d-flex align-items-center  ">
                  <UserAddOutlined /> Đăng kí
                </Nav.Link> */}
                  <Nav.Link as={Link} onClick={handlLoginReloadPage} className="d-flex align-items-center " style={{ color: 'black' }}>
                    <UserOutlined /> Đăng nhập
                  </Nav.Link>
                </>
              )}

              {user && (
                <NavDropdown
                  title={
                    <span style={{ color: 'black' }}>{user.email && user.email.split("@")[0]}</span>
                  }
                  id="basic-nav-dropdown"
                  className=""

                >
                  {user && user.role === "subscriber" && (
                    <NavDropdown.Item as={Link} to="/user/history" style={{ color: 'black' }}>
                      Dashboard
                    </NavDropdown.Item>
                  )}

                  {user && user.role === "admin" && (
                    <NavDropdown.Item as={Link} to="/admin/product" style={{ color: 'black' }}>
                      Dashboard
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item onClick={logout} className="d-flex align-items-center " style={{ color: 'black' }} >
                    <LogoutOutlined /> Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </div>

  );
};

export default Header;
