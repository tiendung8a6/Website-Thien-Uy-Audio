import React, { useState, useEffect } from "react";
import { Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getCategories } from "../../functions/category";

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  const handleCategoryClick = (slug) => {
    history.push(`/category/${slug}`);
    window.location.reload()
  };



  return (
    <Navbar className="bg-body-tertiary" expand="lg">
      <Container className="">
        <Navbar.Brand as={Link} to="/">Navbar with text</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setCurrent("home")} className="d-flex align-items-center ">
              <AppstoreOutlined /> Trang chủ
            </Nav.Link>


            <NavDropdown title="Sản phẩm" id="basic-nav-dropdown">
              {categories.map((c) => (
                <NavDropdown.Item key={c._id} onClick={() => handleCategoryClick(c.slug)}>
                  {c.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>



          </Nav>

          <Navbar.Collapse className="justify-content-end " style={{ color: 'black' }}>
            <Nav>
              <Nav.Link as={Link} to="/cart" onClick={() => setCurrent("cart")} className="d-flex align-items-center">
                <ShoppingCartOutlined />
                <Badge count={cart.length} offset={[9, 0]}>
                  Cart
                </Badge>
              </Nav.Link>

              {!user && (
                <Nav.Link as={Link} to="/register" className="d-flex align-items-center  ">
                  <UserAddOutlined /> Register
                </Nav.Link>
              )}

              {!user && (
                <Nav.Link as={Link} to="/login" className="d-flex align-items-center ">
                  <UserOutlined /> Login
                </Nav.Link>
              )}

              {user && (
                <NavDropdown
                  // title={<SettingOutlined />}
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
                    <LogoutOutlined /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>  
        </Navbar.Collapse>



      </Container>
    </Navbar>
  );
};

export default Header;
